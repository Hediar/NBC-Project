import { fetchTrendMoviesByGenre, getTrendingMovies } from '@/api/tmdb';
import MovieLikes from '../../MovieLikes/MovieLikes';
import Image from 'next/image';
import Link from 'next/link';
import TrendMovieSlider from './TrendMovieSlider';
import MovieItem from '@/components/common/MovieItem';

export const revalidate = 0;

const TrendMoives = async ({ genreId }: { genreId: string }) => {
  let trendMovies;

  if (genreId === 'all') {
    trendMovies = await getTrendingMovies();
  } else {
    trendMovies = await fetchTrendMoviesByGenre(genreId);
  }
  const filteredMovies = trendMovies.results;
  const sliderMovies = filteredMovies.slice(0, 8);
  const listMovies = filteredMovies.slice(8, 14);
  return (
    <>
      <div className="p-5 felx ">
        <h2 className="h1_suit">인기 영화</h2>
        <Link href={'/movielist'}>더보기 &gt;</Link>
      </div>
      <TrendMovieSlider photoData={sliderMovies} />
      <div className="flex flex-wrap">
        {listMovies.map((movie: MovieData, idx: number) => {
          return (
            <>
              <MovieItem movie={movie} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default TrendMoives;
