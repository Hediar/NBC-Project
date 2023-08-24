'use client';
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/config';
import useUserInfoStore from '@/app/(store)/saveCurrentUserData';
import { MovieLikesTable } from '@/types/types';

/**영화id props로 내려받아서, 해당 영화 id가 존재할 때
 * 현재 유저의 좋아요가 있는지 확인하고 -> 현재 user는 zustand로 관리
 * 있으면 하트, 없으면 빈하트(디자인에 맞춰서) -> useState로 관리
 * 좋아요 userid의 배열에 따라 개수 count
 *
 */

const MovieLikes = (props: { movieid: number }) => {
  const [likeusercnt, setLikeusercnt] = useState(0); // 영화를 좋아하는 유저 수
  const [likecurrentuser, setLikecurrentuser] = useState(false); // 현재 유저가 좋아하는지 여부

  const testUser = {
    id: 'test123'
  };

  const { userInfo } = useUserInfoStore();

  const currentLikeUserStateCheck = async () => {
    const { data: currentMovieLikeData } = await supabase.from('movielikes').select('*').eq('movieid', props.movieid);

    if (currentMovieLikeData?.length !== 0) {
      const likeusers = currentMovieLikeData![0].user_id.length;
      setLikeusercnt(likeusers);
    }
  };

  const checklogin = () => {};

  const likeButtonHandler = async () => {
    /**
     * TODO
     * 로그인확인
     * 영화 id 기반으로 db 가져오기 -> 로그인한 id가 해당 db에 있는지 확인
     * 있을 경우 - 제거
     * 없을 경우 - 추가
     *
     * 영화 id가 db에 없을경우?
     * 새로운 row 추가
     */
    const { data: likesTable } = await supabase.from('movielikes').select('*').eq('movieid', props.movieid);

    console.log('table', likesTable);

    if (likesTable?.length) {
      if (likesTable[0]?.user_id.includes(testUser.id)) {
        const { data: users } = await supabase.from('movielikes').select('user_id').eq('movieid', props.movieid);
        const newUsers = [...users![0].user_id.filter((id: string) => id !== testUser.id)];
        console.log('좋아요 취소', newUsers);
        const { error } = await supabase.from('movielikes').update({ user_id: newUsers }).eq('movieid', props.movieid);

        console.log('영화 row가 있고 현재 userid가 있을 때 ', error);
        return;
      } else {
        const { data: users } = await supabase.from('movielikes').select('user_id').eq('movieid', props.movieid);
        const newUsers = [...users![0].user_id, testUser.id];
        console.log(newUsers);
        const { error } = await supabase.from('movielikes').update({ user_id: newUsers }).eq('movieid', props.movieid);
        console.log('영화 row가 있고 현재 userid가 없을 때 ');
        return;
      }
    } else {
      // 영화 db에 열이 없을 경우
      const newUsers: MovieLikesTable = { movieid: props.movieid, user_id: [`${testUser.id}`] };
      console.log('test', newUsers);

      const { error } = await supabase.from('movielikes').insert(newUsers);
      console.log('영화 row가 없을때');
      return;
    }
  };

  useEffect(() => {
    currentLikeUserStateCheck();

    // console.log(userInfo);
  }, []);

  return (
    <div>
      MovieLikes
      <br />
      {props.movieid}
      좋아요 개수: {likeusercnt}
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={likeButtonHandler}
      >
        좋아요
      </button>
    </div>
  );
};

export default MovieLikes;
