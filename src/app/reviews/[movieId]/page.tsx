import React from 'react';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import ReviewForm from '@/components/ReviewForm/ReviewForm';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

interface Params {
  movieId: string;
}

type Props = {
  params: Params;
};

const ReviewPage = async ({ params }: Props) => {
  const { movieId } = params;

  const supabase = createServerActionClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <>
      <ReviewMovie movieId={movieId} />
      {/* <ReviewForm movieId={movieId} user={user} /> */}
    </>
  );
};

export default ReviewPage;
