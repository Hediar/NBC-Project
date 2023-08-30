'use client';

import { getReviews } from '@/api/review';
import ReviewItem from '@/components/ReviewList/ReviewItem';
import ReviewListEmpty from '@/components/ReviewList/ReviewListEmpty';
import useUserInfoStore from '@/store/saveCurrentUserData';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// // import React, { useEffect, useState } from 'react';
// import { cookies } from 'next/headers';
// import ReviewItem from '@/components/ReviewList/ReviewItem';
// import ReviewListEmpty from '@/components/ReviewList/ReviewListEmpty';
// import Link from 'next/link';
// import { getReviews } from '@/api/review';
// import supabase from '@/supabase/config';
// import { useEffect, useState } from 'react';

// const supabase = createServerComponentClient({ cookies });

interface Props {
  params: {
    username: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const MyReviewPage = ({ params, searchParams }: Props) => {
  // console.log('👀page params =====> ', params);
  // console.log('🤬🤬🤬🤬page searchParams =====> ', searchParams);

  // const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  // const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10;

  // console.log('✅page page, limit =====> ', page, limit);

  // const username = decodeURIComponent(params.username);

  // const supabase = createServerComponentClient({ cookies });
  // const { data, error } = await supabase.from('users').select().eq('username', username);
  // const { id: userid } = data![0];
  // console.log('서버컴포넌트 전환 userid =>', userid);

  // const { data: reviews, error: reviewsError } = await getReviews({ userid, page, limit });
  //////////////////////////////////////////////////////////////////
  const { userInfo } = useUserInfoStore();
  // console.log(userInfo);

  const [reviews, setReviews] = useState<ReviewsTable[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTotalPage, setIsTotalPage] = useState(false);

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getMoreData = async (page: number) => {
      const { data, error } = await getReviews({ userid: userInfo.id!, page });
      console.log('데이터가져와', data);
      setReviews([...reviews, ...(data as ReviewsTable[])]);

      if (!data?.length) setIsTotalPage(true);
    };
    if (userInfo.id) getMoreData(currentPage);
  }, [userInfo, currentPage]);

  // if (!dataToProject) return <div>데이터가 없습니다.</div>;

  // // const content = dataToProject.map((review: ReviewsTable) => {
  // //   return <ReviewItem review={review} />;
  // // });

  if (!reviews.length) return <ReviewListEmpty />;

  return (
    <div>
      <ul>
        <li>
          테스트
          <Link href={`/review/write`}>+ 리뷰작성버튼</Link>
        </li>

        {/* {dataToProject.map((review: ReviewsTable) => {
    return <ReviewItem review={review} />;
  })} */}
        {reviews!.map((review, i) => (
          <ReviewItem review={review} key={'ReviewItem' + i} />
        ))}
      </ul>
      {isTotalPage ? null : <button onClick={handleClick}>더 보기</button>}
    </div>
  );
};

export default MyReviewPage;
