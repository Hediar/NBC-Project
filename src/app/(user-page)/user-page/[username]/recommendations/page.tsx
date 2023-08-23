import RecommendationList from '@/components/UserPage/RecommendationList/_RecommendationList';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UserPageMostWatchedGenres from '@/components/UserPage/UserInfo/MostWatchedGenres';
import { MovieDetail } from '@/api/getMovieGernes';
interface Props {
  params: {
    username: string;
  };
}

const RecommendationPage = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('users').select().eq('username', username);
  const { id: userId, watched_movies } = data![0];

  return (
    <>
      <UserPageMostWatchedGenres username={username} />
      <RecommendationList username={username} watched_movies={watched_movies} />
    </>
  );
};

export default RecommendationPage;
