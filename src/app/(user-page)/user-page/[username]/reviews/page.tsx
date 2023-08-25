// import supabase from '@/supabase/config';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';
import ReviewItem from '@/components/ReviewList/ReviewItem';
import ReviewListEmpty from '@/components/ReviewList/ReviewListEmpty';
import Link from 'next/link';

interface Props {
  params: {
    username: string;
  };
}

const MyReviewPage = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('users').select().eq('username', username);
  const { id } = data![0];

  const { data: reviews, error: reviewsError } = await supabase.from('reviews').select('*').eq('userid', id);

  if (!reviews) return <ReviewListEmpty />;

  return (
    <div>
      <ul>
        <li>
          <Link href={`/review/write`}>+ 리뷰작성버튼</Link>
        </li>
        {reviews.map((review) => (
          <ReviewItem review={review} />
        ))}
      </ul>
    </div>
  );
};

export default MyReviewPage;
