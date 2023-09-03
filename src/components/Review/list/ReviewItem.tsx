'use client';

import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import ReviewLikes from '../ReviewLikes';

type Props = {
  review: any;
};

const ReviewItem = ({ review }: Props) => {
  const reviewCategories = [].concat(...JSON.parse(review.category));
  const reviewKeywords = review.keyword!.map((item: string) => JSON.parse(item));
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  return (
    <li>
      <Link className="lg:flex" href={`/review/${review.reviewid}`}>
        <Image
          className="object-cover w-full h-56 rounded-lg lg:w-64"
          src={`${baseImgUrl}w300_and_h450_bestv2${review.movieDetail.backdrop_path}`}
          alt=""
          width={300}
          height={450}
          quality={100}
        />
        <div className="flex flex-col justify-between py-6 lg:mx-6">
          <div>
            <strong className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
              {review.movieDetail.title}
            </strong>
            <div>{review.userDetail.username}</div>
            <div className="overflow-hidden h-16">
              <p className="text-sm text-gray-500 dark:text-gray-300">{review.review}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{review.content}</p>
            </div>
          </div>
          <div>
            <ul className="flex flex-wrap">
              {reviewCategories.map((category: string, i: number) => (
                <li
                  key={category + i}
                  className="m-1 rounded-full text-teal-700 bg-teal-100 border border-teal-300 py-1 px-2 text-xs font-medium"
                >
                  {category}
                </li>
              ))}
              {reviewKeywords.map((keyword: { value: string }, i: number) => (
                <li
                  key={i}
                  className="m-1 rounded-full  text-cyan-700 bg-cyan-100 border border-cyan-300 py-1 px-2 text-xs font-medium"
                >
                  {keyword.value}
                </li>
              ))}
            </ul>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              작성일 {dayjs(review.created_at).format('YYYY.MM.DD')}
            </span>

            <ReviewLikes reviewid={review.reviewid} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ReviewItem;
