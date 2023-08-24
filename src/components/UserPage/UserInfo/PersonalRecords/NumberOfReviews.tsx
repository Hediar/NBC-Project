import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const NumberOfReviews = async ({ userId }: { userId: string }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: reviewData, error: reviewError } = await supabase
    .from('reviews')
    .select('reviewid')
    .eq('userid', userId);

  const getNumberOfReviewsUserWrote = () => {
    if (reviewError) {
      console.log('에러발생, UserPagePersonalRecords.tsx에서 getNumberOfReviewsUserWrote 함수');
      return;
    }
    if (reviewData) return reviewData.length;
  };
  const reviewCount = getNumberOfReviewsUserWrote();
  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl">
      <p className="text-xl">내가 남긴 리뷰수</p>
      <p className="text-lg text-gray-700">{reviewCount}개</p>
    </div>
  );
};

export default NumberOfReviews;
