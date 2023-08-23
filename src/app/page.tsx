import Header from '@/components/Header/Header';
import MainPageMovies from '@/components/MainPageMovies/MainPageMovies';

export default async function Home() {
  return (
    <>
      <main>
        <Header />
        <MainPageMovies />
      </main>
    </>
  );
}
