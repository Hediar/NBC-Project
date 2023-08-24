'use client';
import React, { useState } from 'react';
import supabase from '@/supabase/config';
import useUserInfoStore from '@/app/(store)/saveCurrentUserData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**영화id props로 내려받아서, 해당 영화 id가 존재할 때
 * 현재 유저의 좋아요가 있는지 확인하고 -> 현재 user는 zustand로 관리
 * 있으면 하트, 없으면 빈하트(디자인에 맞춰서) -> useState로 관리
 * 좋아요 userid의 배열에 따라 개수 count
 *
 */

const MovieLikes = (props: { movieid: number }) => {
  const [likecurrentuser, setLikecurrentuser] = useState(false); // 현재 유저가 좋아하는지 여부
  const queryClient = useQueryClient();

  const { data: currentMovieLikeData } = useQuery<any>({
    queryKey: ['movieLikes', props.movieid],
    queryFn: async () => {
      const response = await supabase.from('movielikes').select('*').eq('movieid', props.movieid);
      return response.data;
    },
    enabled: Boolean(props.movieid) // movieid가 있을 때만 요청
  });

  const { userInfo } = useUserInfoStore();

  const mutation = useMutation(
    async () => {
      const { data: likesTable } = await supabase.from('movielikes').select('*').eq('movieid', props.movieid);

      if (likesTable?.length) {
        if (likesTable[0]?.user_id.includes(userInfo.id)) {
          const { data: users } = await supabase.from('movielikes').select('user_id').eq('movieid', props.movieid);
          const newUsers = users![0].user_id.filter((id: string) => id !== userInfo.id);
          await supabase.from('movielikes').update({ user_id: newUsers }).eq('movieid', props.movieid);
        } else {
          const { data: users } = await supabase.from('movielikes').select('user_id').eq('movieid', props.movieid);
          const newUsers = [...users![0].user_id, userInfo.id];
          await supabase.from('movielikes').update({ user_id: newUsers }).eq('movieid', props.movieid);
        }
      } else {
        const newUsers = { movieid: props.movieid, user_id: [userInfo.id] };
        await supabase.from('movielikes').insert(newUsers);
      }
    },
    {
      // 성공 시에 캐시 업데이트
      onSuccess: () => {
        queryClient.invalidateQueries(['movieLikes', props.movieid]);
      }
    }
  );

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
    userInfo.id ? mutation.mutate() : alert('로그인 해주세요!');
  };

  return (
    <div>
      MovieLikes
      <br />
      {props.movieid}
      좋아요 개수: {currentMovieLikeData?.length ? currentMovieLikeData[0].user_id.length : 0}
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
