'use client';

import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Props {
  review: ReviewsTable;
}

const ReviewItem = ({ review }: Props) => {
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  const [movieData, setMovieData] = useState<MovieData>();

  useEffect(() => {
    const getMovieData = async () => {
      const fetchData = await getMovieDetail(review.movieid);
      setMovieData(fetchData);
    };
    getMovieData();
  }, []);

  if (!movieData) return;
  return (
    <div>
      <li>
        <Link href={`/review/${review.reviewid}`}>
          <Image
            src={`${baseImgUrl}w300_and_h450_bestv2${movieData!.backdrop_path}`}
            alt=""
            width={300}
            height={450}
            quality={100}
            className="rounded-lg"
          />
          <strong>{movieData!.title}</strong>
          <p>{review.content}</p>
          <span>작성일 추가예정</span>
        </Link>
      </li>
    </div>
  );
};

export default ReviewItem;
