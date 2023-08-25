'use client';
import POSTWatchLater from '@/api/POSTWatchLater';
/* eslint-disable @next/next/no-img-element */
import MovieLikes from '../MovieLikes/MovieLikes';
import { useRouter } from 'next/navigation';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const DisplayMoviesWIthMovieIds = ({ movieData }: { movieData: [Movie] }) => {
  const router = useRouter();

  const watchLaterClickHandler = async (movieId: number) => {
    await POSTWatchLater(movieId);
    router.refresh();
    return;
  };

  const content = movieData.map((movie: Movie) => {
    return (
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
    );
  });
  return <>{content}</>;
};

export default DisplayMoviesWIthMovieIds;

// {/* <button className="text-3xl opacity-70 hover:opacity-100 transfrom duration-300 ease-in-out">⭐️</button>
// <button className="text-3xl opacity-70 hover:opacity-100 transfrom duration-300 ease-in-out">🩷</button> */}
