import { getLatestReviews } from '@/api/review';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowRight2, HeartLine } from '@/styles/icons/Icons24';
import { SVGTalkEndPoint } from '@/styles/icons/IconsETC';

export const revalidate = 0;

const LatestReviews = async () => {
  const latestReviewData = await getLatestReviews();
  const getColors = latestReviewData.map((data) => data.colors[8]);
  const bgStyles = getColors.map((color) => {
    const rgbColortrans = `rgb(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`;
    const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    return { rgbColortrans, rgbColor };
  });
  // const bgClasses = getColors.map((color) => {
  //   const hexColor = `#${color.map((channel: number) => channel.toString(16).padStart(2, '0')).join('')}`;
  //   return `${hexColor}`;
  // });

  // const rgbToHex = (rgb: any) => {
  //   return `#${rgb.map((channel: any) => channel.toString(16).padStart(2, '0')).join('')}`;
  // };

  // console.log('getColors', bgClasses);

  return (
    <div className="p-5">
      <div className="flex justify-between items-end">
        <h1 className="h3_suit md:text-6xl leading-[72px]">🧐최신 리뷰</h1>
        <Link href={'/review'} className="flex">
          더보기 <ArrowRight2 />
        </Link>
      </div>
      <div className="p-5">
        {latestReviewData?.map((review, index) => {
          return (
            <Link
              key={review.reviewid}
              href={`/review/${review.reviewid}`}
              className="w-full mb-16 m-4 shadow-neutral-400"
            >
              <div
                className={`p-4 border border-opacity-20 rounded-[20px] shadow h-36`}
                style={{
                  backgroundColor: `${bgStyles[index].rgbColortrans}`,
                  borderColor: `${bgStyles[index].rgbColor}`
                }}
              >
                <div className="flex justify-between">
                  <div className="flex">
                    <Image
                      src={`${review.userAvatarURL}`}
                      alt="user_avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-bold mb-2">{review.username}</span>
                  </div>
                  <SVGTalkEndPoint className="opacity-20" />
                </div>

                <div className="truncate w-[680px]">{review.content}</div>
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
