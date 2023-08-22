import { tmdbOptions } from '@/api/tmdb';
import MovieLikes from '../MovieLikes/MovieLikes';
import supabase from '@/supabase/config';
import Image from 'next/image';
import { MovieData } from '@/types/types';

export const revalidate = 0;

const TrendMoives = async () => {
  const detailRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}trending/movie/week?language=ko-KR`,
    tmdbOptions
  );
  const moviesData = await detailRes.json();
  const trendMoives = await moviesData.results;
  // console.log('movies', trendMoives);

  // 매주마다 trend 영화가 살짝 바뀌니까 언제마다 데이터를 불러올지 생각해보기

  return (
    <>
      <div>TrendMoives</div>

      <div>
        {trendMoives?.map((movie: MovieData, idx: number) => {
          return (
            <>
              <div key={idx}>
                <div>{movie.title}</div>
                {/* <div>{movie.id}</div> */}
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}t/p/w200${movie.poster_path}`}
                  alt=""
                  width={200}
                  height={420}
                  priority={false}
                ></Image>
              </div>
              <MovieLikes movieid={movie.id} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default TrendMoives;
