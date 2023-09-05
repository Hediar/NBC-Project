import HotTopics from '@/components/MainPage/HotTopics';
import LatestMovies from '@/components/MainPage/LatestMovies';
import LatestReviews from '@/components/MainPage/LatestReviews';
import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';

export const revalidate = 0;

const GenreMovies = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;
  return (
    <main>
      <div className="p-2">
        <KeywordButtons params={params.genreId} />
      </div>
      <TrendMoives genreId={genreId} />
      <div className="flex">
        <LatestReviews />
        <LatestMovies />
      </div>
      <HotTopics />
    </main>
  );
};

export default GenreMovies;
