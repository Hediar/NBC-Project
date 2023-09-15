import React from 'react';
import MyReviewPage from './client';
import doesUsersMatch from '@/api/doesUserMatch';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const ReviewPage = async ({ params: { username: encodedPageUsername } }: { params: { username: string } }) => {
  const pageUsername = decodeURIComponent(encodedPageUsername);

  const supabase = createServerComponentClient({ cookies });

  const isUserMatch = await doesUsersMatch(supabase, pageUsername);

  return <MyReviewPage isUserMatch={isUserMatch} />;
};

export default ReviewPage;
