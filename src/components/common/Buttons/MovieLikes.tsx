'use client';
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/config';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useQuery } from '@tanstack/react-query';
import throttle from 'lodash/throttle';
import { useMovieLikesMutation } from '@/hooks/useMovieLikesMutation';
import { HeartFilledColor, HeartLineWhite } from '@/styles/icons/Icons24';
import { message } from 'antd';

const MovieLikes = (props: { movieid: number }) => {
  const [likecurrentuser, setLikecurrentuser] = useState(false); // 현재 유저가 좋아하는지 여부
  const [isOnHover, setIsOnHover] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

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
        messageApi.open({
          type: 'error',
          content: '로그인 해주세요!'
        });
      }
    },
    1000, // 스로틀링 간격 (여기서는 1000ms)
    { trailing: false } // 마지막 호출 후 추가 호출 방지
  );

  const checkLikes = async (movieId: number) => {
    if (!userInfo.id) {
      setLikecurrentuser(false);
    } else {
      const { data: likesTable } = await supabase.from('movielikes').select('*').eq('movieid', movieId);
      if (likesTable?.length) {
        const users = likesTable[0].user_id;
        users.includes(userInfo?.id!) ? setLikecurrentuser(true) : setLikecurrentuser(false);
      } else {
        setLikecurrentuser(false);
      }
    }
  };

  useEffect(() => {
    checkLikes(props.movieid);
  }, [userInfo]);

  return (
    <div>
      {contextHolder}
      <button onClick={likeButtonHandler}>
        {likecurrentuser ? (
          <HeartFilledColor className="w-6 h-6 sm:w-7 sm:h-7 movie-like animate-200 hover:scale-110" />
        ) : (
          <HeartLineWhite
            fill={isOnHover ? 'white' : 'transparent'}
            onMouseEnter={() => setIsOnHover(true)}
            onMouseLeave={() => setIsOnHover(false)}
            className="w-7 h-7 sm:w-[30px] sm:h-[30px] movie-like cursor-pointer animate-200 hover:scale-110"
          />
        )}
      </button>
    </div>
  );
};

export default MovieLikes;
