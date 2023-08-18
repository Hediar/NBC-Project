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

  // let { data } = await supabase.from('movielikes').select('*');

  // console.log('data', data);

  return (
    <>
      <div>TrendMoives</div>
      <MovieLikes />
      <div>
        {trendMoives?.map((provider: any, idx: number) => {
          return (
            <>
              <div key={idx}>
                <div>{provider.title}</div>
                <div>{provider.id}</div>
                <img src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}t/p/w200${provider.poster_path}`}></img>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TrendMoives;
