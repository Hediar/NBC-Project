import { getLatestReviews, getUserName } from '@/api/review';

export const revalidate = 0;

const LatestReviews = async () => {
  const { data: latestReviewData } = await getLatestReviews();
  //   console.log(latestReviewData);
  return (
    <div>
      <h2 className="text-2xl">최신 리뷰</h2>
      <div>
        {latestReviewData?.map((review) => {
          const username = getUserName(review.userid);
          return (
            <>
              <div>{username}</div>
              <div>{review.content}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default LatestReviews;
