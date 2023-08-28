import { fetchTrendMoviesByGenre, getTrendingMovies, tmdbOptions } from '@/api/tmdb';
import MovieLikes from '../MovieLikes/MovieLikes';
import Image from 'next/image';
import Link from 'next/link';

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
      <div>TrendMoives</div>

      <div className="w-10/12 flex flex-wrap gap-5 gap-y-10 mt-10 justify-center">
        {filteredMovies?.map((movie: MovieData, idx: number) => {
          return (
            <>
              <div key={idx}>
                <div>{movie.title}</div>
                <div>{movie.id}</div>
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/detail/${movie.id}/main`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}t/p/w200${movie.poster_path}`}
                    alt=""
                    width={200}
                    height={420}
                    priority={false}
                  ></Image>
                </Link>

                <MovieLikes movieid={movie.id} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TrendMoives;
