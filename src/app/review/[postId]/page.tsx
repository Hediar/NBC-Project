import { getMovieDetail } from '@/api/tmdb';
import StarBox from '@/components/ReviewForm/StarBox';
import UtilButtons from '@/components/ReviewForm/UtilButtons';
import supabase from '@/supabase/config';
import Image from 'next/image';
import React from 'react';

interface Params {
  postId: string;
}

type Props = {
  params: Params;
};

export const dynamic = 'force-dynamic';

const ReviewDetail = async ({ params }: Props) => {
  const { postId } = params;

  const { data: reviews, error } = await supabase.from('reviews').select('*').eq('reviewid', postId);
  const review = reviews![0];
  //   console.log(review);

  const { data: users } = await supabase.from('users').select('*').eq('id', review.userid);
  const user = users![0];
  //   console.log(user);

  const movieData = await getMovieDetail(review.movieid);

  let reviewCategories = JSON.parse(review.category);
  reviewCategories = [].concat(...reviewCategories);

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  return (
    <div>
      ReviewDetail postId: {postId}
      <div className="mb-4">
        영화정보
        <Image
          src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
          alt="이미지없음"
          width={300}
          height={450}
          quality={100}
          className="rounded-lg"
        />
        <strong>{movieData.title}</strong>
        <div>{movieData.release_date.slice(0, 4)}</div>
        <div>{movieData.genres.map((genre: MovieGenre) => `${genre.name} `)}</div>
        <div>{movieData.production_countries[0]['iso_3166_1']}</div>
        <div>{movieData.runtime}분</div>
        <div>{movieData.adult ? '청소년관람불가' : '전체관람가'}</div>
      </div>
      <div className="mb-4">
        리뷰내용
        <div>작성자: {user.username}</div>
        <div>작성일: {}</div>
        <label className="block text-gray-700 text-sm font-bold mb-2">영화 본 날짜</label>
        <div>{review.date}</div>
        <label className="block text-gray-700 text-sm font-bold mb-2">어떤 점이 좋았나요?</label>
        <div>
          <ul>
            {reviewCategories.map((category: string, i: number) => (
              <li key={category + i}>{category}</li>
            ))}
          </ul>
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">리뷰 한줄평</label>
        <div>{review.review}</div>
        <label className="block text-gray-700 text-sm font-bold mb-2">별점</label>
        <div>
          <StarBox rating={review.rating} readOnly={true} />
          {review.rating}
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">메모</label>
        <div>{review.content}</div>
        <UtilButtons postId={postId} userId={user.id} />
      </div>
    </div>
  );
};

export default ReviewDetail;
