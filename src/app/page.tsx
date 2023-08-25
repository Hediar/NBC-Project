import MainPageMovies from '@/components/MainPageMovies/MainPageMovies';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <>
      <main>
        <MainPageMovies />
      </main>
    </>
  );
}
