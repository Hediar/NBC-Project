'use client';

import React, { useState } from 'react';
import supabase from '@/supabase/config';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useQuery } from '@tanstack/react-query';
import { throttle } from 'lodash';
import { useReviewLikesMutation } from '@/hooks/useReviewLikesMutation';

const ReviewLikes = (props: { reviewid: string }) => {
  const { data: currentReviewLikeData } = useQuery({
    queryKey: ['reviewLikes', props.reviewid],
    queryFn: async () => {
      const response = await supabase.from('reviewlikes').select('*').eq('reviewid', props.reviewid);
      return response.data;
    },
    enabled: Boolean(props.reviewid) // reviewid가 있을 때만 요청
  });

  const { userInfo } = useUserInfoStore();

  const mutation = useReviewLikesMutation(props.reviewid, userInfo?.id!);

  // 좋아요 버튼
  const likeButtonHandler = throttle(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      if (userInfo?.id) {
        await mutation.mutateAsync();
      } else {
        alert('로그인 해주세요!');
      }
    },
    1000, // 스로틀링 간격 (여기서는 1000ms)
    { trailing: false } // 마지막 호출 후 추가 호출 방지
  );

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={likeButtonHandler}
      >
        좋아요
        {currentReviewLikeData?.length ? currentReviewLikeData[0].user_id.length : 0}
      </button>
    </div>
  );
};

export default ReviewLikes;
