import { tmdbOptions } from '@/api/tmdb';
import MovieLikes from '../MovieLikes/MovieLikes';
import Image from 'next/image';
import { MovieData } from '@/types/types';
import Link from 'next/link';

export const revalidate = 0;

interface TrendMoviesProps {
  selectedGenreId: number | null;
}

const TrendMoives = async ({ selectedGenreId }: TrendMoviesProps) => {
  const detailRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}trending/movie/week?language=ko-KR`,
    tmdbOptions
  );
  const moviesData = await detailRes.json();
  const trendMoives = await moviesData.results;
  // console.log('movies', trendMoives);

  // 매주마다 trend 영화가 살짝 바뀌니까 언제마다 데이터를 불러올지 생각해보기
  const filteredMovies = selectedGenreId
    ? trendMoives.filter((movie: MovieData) => movie.genre_ids?.includes(selectedGenreId))
    : trendMoives;
  return (
    <>
      <div>TrendMoives</div>

      <div>
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
              </div>
              {/* <MovieLikes movieid={movie.id} /> */}
            </>
          );
        })}
      </div>
    </>
  );
};

export default TrendMoives;
