import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import RecordsContainerSmall from '../_Containers/RecordsContainerSmall';

export const dynamic = 'force-dynamic';

const NumberOfReviews = async ({ userId }: { userId: string }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: reviewData } = await supabase.from('reviews').select('reviewid').eq('userid', userId);

  const reviewCount = reviewData!.length;

  return (
    <RecordsContainerSmall
      key="ECEFFF"
      borderColor="#cad3fe"
      title="리뷰 개수"
      value={reviewCount.toString()}
      bgColor="#ECEFFF"
      textColor="#4461fa"
    />
  );
};

export default NumberOfReviews;
