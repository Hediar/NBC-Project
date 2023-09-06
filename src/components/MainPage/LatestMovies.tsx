import { getNewMovies } from '@/api/tmdb';
import dayjs from 'dayjs';
import LatestMovieSlider from './MainPageMovies/LatestMovieSlider';

export const revailidate = 0;

const LatestMovies = async () => {
  const currentDate = dayjs();
  const oneMonthPrev = currentDate.subtract(1, 'month');

  const formattedCurrentDate = currentDate.format('YYYY-MM-DD');
  const formattedOneMonthPrev = oneMonthPrev.format('YYYY-MM-DD');
  const data = await getNewMovies(formattedCurrentDate, formattedOneMonthPrev);
  const newMovies = data.results;

  return (
    <div className="p-5 flex-1">
      <h1 className="h1_suit">최근 개봉 영화</h1>
      <div className="p-5">
        <LatestMovieSlider photoData={newMovies} />
      </div>
    </div>
  );
};

export default LatestMovies;
