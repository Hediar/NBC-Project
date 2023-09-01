import React from 'react';
import ReviewWriteTemplate from '@/components/ReviewForm/ReviewWriteTemplate';
import supabase from '@/supabase/config';

interface Params {
  postId: string;
}

type Props = {
  params: Params;
};

const ReviewPage = async ({ params }: Props) => {
  const { postId } = params;

  const { data: reviews, error } = await supabase.from('reviews').select('*').eq('reviewid', postId);
  const review = reviews![0];

  return (
    <>
      <ReviewWriteTemplate editReview={review} />
    </>
  );
};

export default ReviewPage;
