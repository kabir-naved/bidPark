// Source: src/pages/index.tsx
import "@/app/globals.css";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

// export default async function Home({searchParams}:{SearchParams: Promise<{query?: string}>} ) {
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search: query || null};
  // const posts = await client.fetch(STARTUP_QUERY);

  const session = await auth();
  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  // console.log(JSON.stringify(posts, null, 2));
  // const posts = [{
  //   _createdAt: new Date(),
  //   views: 100,
  //   author: {_id:1, name: 'John Doe'},
  //   _id: '1',
  //   discription: 'A platform where you can pitch your startup to investors, get feedback and get funded.',
  //   image: 'https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg',
  //   category: 'Technology',
  //   title: 'Tech Beast'
  // }]

  return (
    <>
      <section className={`pink_container`}>
        <h1 className="heading rounded-2xl">
          Pitch Your Startup, <br />
          Get Funded from Investors
        </h1>

        <p className="sub-heading !max-w-3xl">
          A platform where you can pitch your startup to investors, get feedback
          and get funded.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `search results for ${query}` : "Latest Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>


      <SanityLive/>
    </>
  );
}
