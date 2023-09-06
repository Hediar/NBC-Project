import { getLatestReviews } from '@/api/review';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowRight2, HeartLine } from '@/styles/icons/Icons24';
import { SVGTalkEndPoint } from '@/styles/icons/IconsETC';

export const revalidate = 0;

const LatestReviews = async () => {
  const latestReviewData = await getLatestReviews();
  const backgroundColors = ['#FFF8DE', '#ECEFFF', '#FAF0FF', '#FFEDE5'];

  return (
    <div className="p-5 flex-1">
      <div className="flex justify-between items-end">
        <h1 className="h1_suit">🧐최신 리뷰</h1>
        <Link href={'/review'} className="flex">
          더보기 <ArrowRight2 />
        </Link>
      </div>
      <div>
        {latestReviewData?.map((review, index) => {
          return (
            <Link key={review.reviewid} href={`/review/${review.reviewid}`} className="w-full mb-16 m-4">
              <div className={`p-4 border border-gray-300 rounded-xl h-36 bg-${backgroundColors[index]}`}>
                <div className="flex justify-between">
                  <div className="flex">
                    <Image src={`${review.userAvatarURL}`} alt="user_avatar" width={40} height={40} />
                    <span className="font-bold mb-2">{review.username}</span>
                  </div>
                  <SVGTalkEndPoint />
                </div>

                <div className="overflow-ellipsis w-[680px]">{review.content}</div>
                <div className="flex justify-between">
                  <span className="flex">
                    <HeartLine />
                    {/* {review.reviewLikesCount.length ? review.reviewLikesCount : 0} */}
                  </span>
                  <ArrowRight />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LatestReviews;
