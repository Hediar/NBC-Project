'use client';

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import ReviewLikes from '../ReviewLikes';
import { Edit, StarFill } from '@/styles/icons/Icons24';
import UtilButtons from '@/components/ReviewForm/UtilButtons';
import PosterBaseColor from './PosterBaseColor';

type Props = {
  review: any;
};

const ReviewItem = ({ review }: Props) => {
  const reviewCategories = [].concat(...JSON.parse(review.category));
  const reviewKeywords = review.keyword!.map((item: string) => JSON.parse(item));
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  return (
    <li className="shadow1 rounded-[20px] min-h-[390px]">
      <Link href={`/review/${review.reviewid}`} className="flex flex-col w-full h-full">
        <div className="flex items-center px-5 py-3">
          <div className="w-10 h-10 bg-white rounded-full border border-gray-200 overflow-hidden">
            <Image
              className="object-cover w-full"
              src={`${review.userDetail.avatar_url}`}
              alt="프로필 이미지"
              width={40}
              height={40}
              quality={100}
            />
          </div>
          <div className="pl-2 body1_bold_suit">{review.userDetail.username}</div>
          <span className="pl-5 body2_suit">{dayjs(review.created_at).format('YYYY.MM.DD')}</span>
          <div className="ml-auto">
            <UtilButtons postId={review.reviewid} userId={review.userid} />
          </div>
        </div>

        <div className="relative h-24 px-[40px] pt-[18px] bg-gradient-to-l from-orange-200 to-violet-200">
          <PosterBaseColor poster_path={review.movieDetail.backdrop_path} />

          <div className="relative flex gap-3 items-center">
            <div className="flex-none w-[60px] h-[90px]">
              <Image
                className="object-cover w-full rounded"
                src={`${baseImgUrl}w300_and_h450_bestv2${review.movieDetail.backdrop_path}`}
                alt=""
                width={60}
                height={90}
                quality={100}
              />
            </div>
            <div>
              <strong className="body1_regular_suit">{review.movieDetail.title}</strong>
              <div className="flex gap-1">
                <StarFill className="w-4" />
                <span className="text-neutral-800 text-[13px] font-normal">{review.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end items-center flex-1 pt-10 pb-5 mx-6 ">
          <div className="flex flex-col justify-center items-center flex-1 w-full body1_regular_suit">
            <p>{review.review}</p>
            <p>{review.content}</p>
          </div>
          <ul className="flex flex-wrap gap-2 mt-3 mb-[15px] justify-center">
            {reviewCategories.map((category: string, i: number) => (
              <li
                key={category + i}
                className="min-w-[70px] min-h-[29px] px-3 py-1.5 bg-rose-100 rounded-lg border border-white justify-center items-center gap-2.5 inline-flex body2_suit"
              >
                {category}
              </li>
            ))}
            {reviewKeywords.map((keyword: { value: string }, i: number) => (
              <li
                key={i}
                className="min-w-[70px] min-h-[29px] px-3 py-1.5 bg-rose-100 rounded-lg border border-white justify-center items-center gap-2.5 inline-flex body2_suit"
              >
                {keyword.value}
              </li>
            ))}
          </ul>

          <ReviewLikes reviewid={review.reviewid} />
        </div>
      </Link>
    </li>
  );
};

export default ReviewItem;
