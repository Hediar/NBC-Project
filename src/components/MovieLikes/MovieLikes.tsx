'use client';
import React, { useEffect } from 'react';
import supabase from '@/supabase/config';
import LikeButton from '../Buttons/LikeButton';

export const revalidate = 0;

/**영화id props로 내려받아서, 해당 영화 id가 존재할 때
 * 현재 유저의 좋아요가 있는지 확인하고
 * 있으면 하트, 없으면 빈하트(디자인에 맞춰서) -> 전역상태로 관리 default 0
 * 좋아요 userid의 배열에 따라 개수 count
 *
 */
const MovieLikes = () => {
  const likeDataFetch = async () => {
    let test = await supabase.from('reviews').select('*');
    let { data } = await supabase.from('movielikes').select('*');

    console.log('data', data);
  };
  useEffect(() => {
    likeDataFetch();
  }, []);
  return (
    <div>
      MovieLikes
      <LikeButton />
    </div>
  );
};

export default MovieLikes;
