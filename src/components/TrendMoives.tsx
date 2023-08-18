import { getMovieList } from '@/api/movie';
import { tmdbOptions } from '@/api/tmdb';
import { supabase } from '@/supabase/config';

const TrendMoives = async () => {
  // let { data } = await getMovieList();
  // console.log('res', data);
  // const trendMoives = data.results;

  const detailRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}trending/movie/week?language=ko-KR`,
    tmdbOptions
  );
  const data = await detailRes.json();
  const trendMoives = await data.results;
  // console.log('movies', trendMoives);

  let movielikes = await supabase.from('movielikes').select('*');
  let test = await supabase.from('reviews').select('*');
  console.log('data', movielikes);

  return (
    <>
      <div>TrendMoives</div>
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
