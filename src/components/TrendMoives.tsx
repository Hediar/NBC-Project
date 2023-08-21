import { tmdbOptions } from '@/api/tmdb';
import MovieLikes from './MovieLikes/MovieLikes';
import supabase from '@/supabase/config';

export const revalidate = 0;

const TrendMoives = async () => {
  // let { data } = await getMovieList();
  // console.log('res', data);
  // const trendMoives = data.results;

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
        {trendMoives?.map((movie: any, idx: number) => {
          return (
            <>
              <div key={idx}>
                <div>{movie.title}</div>
                {/* <div>{movie.id}</div> */}
                <img src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}t/p/w200${movie.poster_path}`}></img>
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
