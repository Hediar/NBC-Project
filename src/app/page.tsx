import KeywordButtons from '@/components/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPageMovies/TrendMoives';

export default async function Home() {
  return (
    <>
      <main>
        {/* <MainPageMovies /> */}
        <KeywordButtons />
        <TrendMoives genreId={'all'} />
      </main>
    </>
  );
}
