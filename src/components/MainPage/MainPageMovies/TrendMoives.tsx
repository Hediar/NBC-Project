import { fetchTrendMoviesByGenre, getTrendingMovies } from '@/api/tmdb';
import MovieLikes from '../../MovieLikes/MovieLikes';
import Image from 'next/image';
import Link from 'next/link';
import AddIgnoreMovieButton from '../../common/AddIgnoreMovieButton';
import Carousel from './Carousel';
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
  return (
    <>
      <div className="p-5 felx ">
        <h2 className="text-2xl">인기 영화</h2>
        <Link href={'/movielist'}>더보기 &gt;</Link>
      </div>
      <TrendMovieSlider photoData={filteredMovies} />
      {/* <div className="overflow-x-scroll flex">
        {filteredMovies?.map((movie: MovieData, idx: number) => {
          return (
            <>
              <div className="flex-none py-6 px-3 first:pl-6 last:pr-6">
                <div key={movie.id}>
                  <div>
                    {movie.title} {movie.id}
                  </div>
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
                  </Link>
                  <MovieLikes movieid={movie.id} />
                  <AddIgnoreMovieButton movieid={movie.id} />
                </div>
              </div>
            </>
          );
        })}
      </div> */}
    </>
  );
};

export default TrendMoives;
