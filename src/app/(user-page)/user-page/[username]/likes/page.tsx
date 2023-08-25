import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
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

const LikesListPage = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient({ cookies });
  const { data: userIdData, error: err } = await supabase.from('users').select('id').eq('username', username);

  const userId = userIdData![0].id;
  if (err) return <>user not found! Or finding user error.</>;
  //
  const { data: userLikedMoviesGroup, error: userIdGroupError } = await supabase
    .from('movielikes')
    .select('movieid')
    .contains('user_id', [userId]);

  const usersLikedMovies = userLikedMoviesGroup?.map((el) => el.movieid);

  //
  if (!usersLikedMovies) return <>아직 유저가 좋아한 영화가 없습니다.</>;
  // usersLikedMovies = ['1','2','3','4'] [...movieId]
  const movieDetails = await getMovieDataWithMovieIds(usersLikedMovies);

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h2 className="text-center font-bold text-2xl">{username}님이 좋아하신 영화</h2>
      <div className="w-10/12 flex flex-wrap  gap-y-10 mt-10 justify-center sm:gap-10 md:gap-5 gap-5">
        <DisplayMoviesWIthMovieIds movieData={movieDetails as [Movie]} />
      </div>
    </div>
  );
};

export default LikesListPage;
