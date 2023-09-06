/* eslint-disable @next/next/no-img-element */

'use client';

import POSTWatchLater from '@/api/POSTWatchLater';
import MovieLikes from '../MovieLikes/MovieLikes';
import { usePathname, useRouter } from 'next/navigation';
import useUserInfoStore from '@/store/saveCurrentUserData';
import getMovieNameWIthMovieId from '@/api/getMovieNameWIthMovieId';
import { message } from 'antd';

const DisplayMoviesWIthMovieIds = ({ movieData }: { movieData: MovieData[] }) => {
  const router = useRouter();
  const path = usePathname() ?? '';
  const { userInfo } = useUserInfoStore();
  const [messageApi, contextHolder] = message.useMessage();

  const watchLaterClickHandler = async (movieId: number) => {
    if (!userInfo.id) {
      router.replace('?sign-in=true');
      return;
    }
    const message = await POSTWatchLater(movieId);
    const movieTitle = await getMovieNameWIthMovieId([movieId.toString()]);
    messageApi.open({
      type: 'success',
      content: movieTitle[0] + message
    });

    router.refresh();
    return;
  };

  const content = movieData.map((movie) => {
    return (
      <>
        {contextHolder}
        <div key={movie.id} className="w-56 h-full flex flex-col gap-2 z-0">
          <div className="rounded-lg h-2/3 overflow-hidden relative ">
            <div className="absolute text-white bg-slate-600 bg-opacity-60 rounded-md p-3  flex flex-col gap-2 z-10">
              <MovieLikes movieid={movie.id} />
              <button
                className="text-2xl opacity-70 hover:opacity-100 transfrom duration-300 ease-in-out"
                onClick={() => watchLaterClickHandler(movie.id)}
              >
                찜하기🩷
              </button>
            </div>
            <img
              onClick={() => router.push('/detail/' + movie.id)}
              className="w-full h-full cursor-pointer"
              alt="poster"
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            />
          </div>

          <div className="flex flex-col gap-1 w-full h-1/3">
            <h4 className="text-sm font-bold">{movie.title}</h4>
            <div className="flex gap-2">
              <p className="text-xs">{movie.release_date}</p>
            </div>
          </div>
        </div>
      </>
    );
  });
  return <>{content}</>;
};

export default DisplayMoviesWIthMovieIds;

// {/* <button className="text-3xl opacity-70 hover:opacity-100 transfrom duration-300 ease-in-out">⭐️</button>
// <button className="text-3xl opacity-70 hover:opacity-100 transfrom duration-300 ease-in-out">🩷</button> */}
