import { getNewMovies } from '@/api/tmdb';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="p-5">
      <h2 className="text-2xl">최근 개봉 영화</h2>
      <div className="p-5">
        <LatestMovieSlider photoData={newMovies} />
      </div>
    </div>
  );
};

export default LatestMovies;
