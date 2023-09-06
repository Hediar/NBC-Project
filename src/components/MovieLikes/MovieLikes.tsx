'use client';
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/config';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useQuery } from '@tanstack/react-query';
import { throttle } from 'lodash';
import { useMovieLikesMutation } from '@/hooks/useMovieLikesMutation';
import { HeartFilledColor, HeartLine } from '@/styles/icons/Icons24';

const MovieLikes = (props: { movieid: number }) => {
  const [likecurrentuser, setLikecurrentuser] = useState(false); // 현재 유저가 좋아하는지 여부

  const { data: currentMovieLikeData } = useQuery({
    queryKey: ['movieLikes', props.movieid],
    queryFn: async () => {
      const response = await supabase.from('movielikes').select('*').eq('movieid', props.movieid);
      return response.data;
    },
    enabled: Boolean(props.movieid) // movieid가 있을 때만 요청
  });

  const { userInfo } = useUserInfoStore();

  const mutation = useMovieLikesMutation(props.movieid, userInfo?.id!, likecurrentuser, setLikecurrentuser);

  // 좋아요 버튼
  const likeButtonHandler = throttle(
    async () => {
      if (userInfo?.id) {
        await mutation.mutateAsync();
      } else {
        alert('로그인 해주세요!');
      }
    },
    1000, // 스로틀링 간격 (여기서는 1000ms)
    { trailing: false } // 마지막 호출 후 추가 호출 방지
  );

  const checkLikes = async (movieId: number) => {
    const { data: likesTable } = await supabase.from('movielikes').select('*').eq('movieid', movieId);
    if (likesTable?.length) {
      const users = likesTable[0].user_id;
      users.includes(userInfo?.id!) ? setLikecurrentuser(true) : setLikecurrentuser(false);
    } else {
      setLikecurrentuser(false);
    }
  };

  useEffect(() => {
    checkLikes(props.movieid);
  }, []);

  return (
    <div>
      MovieLikes
      <br />
      {props.movieid}
      좋아요 개수: {currentMovieLikeData?.length ? currentMovieLikeData[0].user_id.length : 0}
      <br />
      <button className="py-2 px-4 rounded" onClick={likeButtonHandler}>
        {likecurrentuser ? <HeartFilledColor /> : <HeartLine />}
      </button>
    </div>
  );
};

export default MovieLikes;

/**
 * const mutation = useMutation(
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
 */
