import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  review: any;
}

const ReviewItem = async ({ review }: Props) => {
  const movieData = await getMovieDetail(review.movieid);

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  return (
    <div>
      <li>
        <Link href={`/review/${review.reviewid}`}>
          <Image
            src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
            alt=""
            width={300}
            height={450}
            quality={100}
            className="rounded-lg"
          />
          <strong>{movieData.title}</strong>
          <p>{review.content}</p>
          <span>작성일 추가예정</span>
        </Link>
      </li>
    </div>
  );
};

export default ReviewItem;
