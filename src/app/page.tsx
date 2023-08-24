import KeywordButtons from '@/components/MainPageMovies/KeywordButtons';
import MainPageMovies from '@/components/MainPageMovies/MainPageMovies';

export default async function Home(props: { main: React.ReactNode }) {
  return (
    <>
      <main>
        {/* <MainPageMovies /> */}
        <KeywordButtons />
        {props.main}
      </main>
    </>
  );
}
