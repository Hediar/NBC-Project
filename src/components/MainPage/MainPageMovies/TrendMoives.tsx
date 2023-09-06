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
              {/* <div className="flex-none py-6 first:pl-6 last:pr-6 relative">
                <div key={movie.id}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/detail/${movie.id}/main`}
                    className="w-56 h-full flex flex-col gap-2 items-center "
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}w220_and_h330_bestv2${movie.poster_path}`}
                      alt=""
                      width={200}
                      height={420}
                      priority={false}
                      className="rounded-2xl"
                    ></Image>
                    <div>{movie.title}</div>
                  </Link>
                  <div className="absolute top-7 right-5">
                    <MovieLikes movieid={movie.id} />
                  </div>
                </div>
              </div> */}
            </>
          );
        })}
      </div>
    </>
  );
};

export default TrendMoives;
