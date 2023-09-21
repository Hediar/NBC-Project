'use client';

import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/config';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useQuery } from '@tanstack/react-query';
import throttle from 'lodash/throttle';
import { useReviewLikesMutation } from '@/hooks/useReviewLikesMutation';
import { HeartFilledColor, HeartLine } from '@/styles/icons/Icons24';
import { HeartFilledColor as HeartFilledColor32, HeartLined as HeartLine32 } from '@/styles/icons/Icons32';
import { message } from 'antd';

const ReviewLikes = ({ reviewid, size = '24' }: { reviewid: string; size?: string }) => {
  const [likecurrentuser, setLikecurrentuser] = useState(false); // 현재 유저가 좋아하는지 여부
  const [isOnHover, setIsOnHover] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: currentReviewLikeData } = useQuery({
    queryKey: ['reviewLikes', reviewid],
    queryFn: async () => {
      const response = await supabase.from('reviewlikes').select('*').eq('reviewid', reviewid);
      return response.data;
    },
    enabled: Boolean(reviewid) // reviewid가 있을 때만 요청
  });

  const { userInfo } = useUserInfoStore();

  const mutation = useReviewLikesMutation(reviewid, userInfo?.id!, likecurrentuser, setLikecurrentuser);

  // 좋아요 버튼
  const likeButtonHandler = throttle(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

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

  const checkLikes = async (reviewid: string) => {
    const { data: reviewsTable } = await supabase.from('reviewlikes').select('*').eq('reviewid', reviewid);
    if (reviewsTable?.length) {
      const users = reviewsTable[0].user_id;
      users.includes(userInfo?.id!) ? setLikecurrentuser(true) : setLikecurrentuser(false);
    } else {
      setLikecurrentuser(false);
    }
  };

  useEffect(() => {
    userInfo && checkLikes(reviewid);
  }, [userInfo]);

  const LIKE_ICON = {
    default: {
      '24': (
        <HeartLine
          fill={isOnHover ? '#4F4F4F' : 'transparent'}
          onMouseEnter={() => setIsOnHover(true)}
          onMouseLeave={() => setIsOnHover(false)}
          className="cursor-pointer animate-200 hover:scale-110"
        />
      ),
      '32': (
        <HeartLine32
          fill={isOnHover ? '#4F4F4F' : 'transparent'}
          onMouseEnter={() => setIsOnHover(true)}
          onMouseLeave={() => setIsOnHover(false)}
          className="cursor-pointer animate-200 hover:scale-110"
        />
      )
    },
    active: {
      '24': <HeartFilledColor className="animate-200 hover:scale-110" />,
      '32': <HeartFilledColor32 className="animate-200 hover:scale-110" />
    }
  } as any;

  return (
    <div className="flex items-center gap-1">
      {contextHolder}
      <button onClick={likeButtonHandler}>{likecurrentuser ? LIKE_ICON.active[size] : LIKE_ICON.default[size]}</button>
      <span className="body2_suit">{currentReviewLikeData?.length ? currentReviewLikeData[0].user_id.length : 0}</span>
    </div>
  );
};

export default ReviewLikes;
