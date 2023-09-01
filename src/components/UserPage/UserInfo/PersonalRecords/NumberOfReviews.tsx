import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const NumberOfReviews = async ({ userId }: { userId: string }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: reviewData } = await supabase.from('reviews').select('reviewid').eq('userid', userId);

  const reviewCount = reviewData!.length;

  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl p-8 ">
      <p className="text-xl">내가 남긴 리뷰수</p>
      {reviewCount ? (
        <p className="text-lg text-gray-700">{reviewCount}개</p>
      ) : (
        <p className="text-md text-gray-600">남긴 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default NumberOfReviews;
