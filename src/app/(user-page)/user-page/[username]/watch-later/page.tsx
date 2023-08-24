import React from 'react';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import DisplayMovies from '@/components/common/_DisplayMovies';
import DisplayInfiniteMovies from '@/components/common/_DisplayMoviesInfiniteScroll';
import DisplayMoviesWIthMovieIds from '@/components/common/_DisplayMoviesWithMovieIds';
interface Props {
  params: {
    username: string;
  };
}

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

const ToWatchListPage = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient({ cookies });
  const { data: userId, error: err } = await supabase.from('users').select('id').eq('username', username);
  if (err) return <>user not found! Or finding user error.</>;
  const { data: watchLaterMovies, error } = await supabase
    .from('watch_later')
    .select('movies')
    .eq('userid', userId[0].id);
  if (error) return <>no saved watch later movies!</>;

  // movieList = ['1','2','3','4'] [...movieId]
  const movieList: [string] = watchLaterMovies[0].movies;
  const movieDetails = await getMovieDataWithMovieIds(movieList);
  console.log(movieDetails);

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h2 className="text-center font-bold text-2xl">{username}님의 찜 목록</h2>
      <div className="w-10/12 flex flex-wrap gap-5 gap-y-10 mt-10 justify-center">
        <DisplayMoviesWIthMovieIds movieData={movieDetails as [Movie]} />
      </div>
    </div>
  );
};

export default ToWatchListPage;
