import { fetchTrendMoviesByGenre, getTrendingMovies } from '@/api/tmdb';
import MovieLikes from '../../MovieLikes/MovieLikes';
import Image from 'next/image';
import Link from 'next/link';
import AddIgnoreMovieButton from '../../common/AddIgnoreMovieButton';
import Carousel from './TrendMoviesCarousel';
import TrendMovieSlider from './TrendMovieSlider';

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
        <h2 className="text-2xl">인기 영화</h2>
        <Link href={'/movielist'}>더보기 &gt;</Link>
      </div>
      <TrendMovieSlider photoData={sliderMovies} />
      <div className="flex flex-wrap">
        {listMovies.map((movie: MovieData, idx: number) => {
          return (
            <>
              <div className="flex-none py-6 first:pl-6 last:pr-6">
                <div key={movie.id}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/detail/${movie.id}/main`}
                    className="w-56 h-full flex flex-col gap-2 items-center"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}t/p/w200${movie.poster_path}`}
                      alt=""
                      width={200}
                      height={420}
                      priority={false}
                    ></Image>
                    <div>{movie.title}</div>
                  </Link>
                  <MovieLikes movieid={movie.id} />
                  <AddIgnoreMovieButton movieid={movie.id} />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TrendMoives;
