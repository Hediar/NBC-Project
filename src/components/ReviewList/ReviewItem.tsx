'use client';

import { getMovieDetail } from '@/api/tmdb';
import { StarFill } from '@/styles/icons/Icons24';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import UtilButtons from '../ReviewForm/UtilButtons';
import PosterBaseColor from '../Review/list/PosterBaseColor';
import { MyReviewItemLoading } from './MyReviewListLoading';

interface Props {
  review: ReviewsTable;
}

const ReviewItem = ({ review }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState<MovieData>();

  useEffect(() => {
    const getMovieData = async () => {
      const fetchData = await getMovieDetail(review.movieid);
      setMovieData(fetchData);
      setIsLoading(false);
    };
    getMovieData();
  }, []);

  const reviewCategories = [].concat(...JSON.parse(review.category));
  const reviewKeywords = review.keyword!.map((item: string) => JSON.parse(item));
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  if (isLoading) return <MyReviewItemLoading />;

  return (
    <li className="min-h-[384px]">
      <Link
        href={`/review/${review.reviewid}`}
        className="overflow-hidden flex flex-col relative w-full h-full p-5 pb-4 rounded-2xl shadow sm:p-10 sm:pb-8"
      >
        <div className="absolute top-0 left-0 w-full h-[90px] px-[40px] pt-[18px] bg-gradient-to-l from-orange-200 to-violet-200">
          <PosterBaseColor poster_path={movieData!.backdrop_path} />
        </div>
        <div className="flex flex-col items-center gap-5 relative z-[1] sm:flex-row sm:items-start">
          <div className="overflow-hidden w-40 max-h-60 rounded-xl">
            <Image
              className="object-cover w-full"
              src={`${baseImgUrl}w300_and_h450_bestv2${movieData!.backdrop_path}`}
              alt="프로필 이미지"
              width={160}
              height={240}
              quality={100}
            />
          </div>

          <div className="w-full text-center sm:text-left">
            <div className="body3_suit text-neutral-800 ">{dayjs(review.created_at).format('YYYY.MM.DD')}</div>
            <strong className="body1_bold_suit mt-1">{movieData!.title}</strong>
            <div className="flex justify-center gap-1 mt-[22px] sm:justify-start">
              <StarFill className="w-4" />
              <span className="text-neutral-800 text-[13px] font-normal">{review.rating}</span>
            </div>
            <p className="body1_regular_suit mt-3">{review.review}</p>
            <p className="body1_regular_suit">{review.content}</p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center justify-center content-center gap-2 flex-1 mt-3">
          {reviewCategories.map((category: string, i: number) => (
            <li
              key={category + i}
              className="min-w-[70px] min-h-[29px] px-3 py-1.5 bg-rose-100 rounded-lg border border-white justify-center items-center gap-2.5 inline-flex text-neutral-800 text-sm font-normal leading-[17px]"
            >
              {category}
            </li>
          ))}
          {reviewKeywords.map((keyword: { value: string }, i: number) => (
            <li
              key={i}
              className="min-w-[70px] min-h-[29px] px-3 py-1.5 bg-rose-100 rounded-lg border border-white justify-center items-center gap-2.5 inline-flex text-neutral-800 text-sm font-normal leading-[17px]"
            >
              {keyword.value}
            </li>
          ))}
        </ul>

        <UtilButtons postId={review.reviewid!} userId={review.userid} className="absolute top-5 right-5" />
      </Link>
    </li>
  );
};

export default ReviewItem;
