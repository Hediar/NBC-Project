import { getMovieDetail } from '@/api/tmdb';
import StarBox from '@/components/ReviewForm/StarBox';
import UtilButtons from '@/components/ReviewForm/UtilButtons';
import supabase from '@/supabase/config';
import Image from 'next/image';
import React from 'react';
import dayjs from 'dayjs';

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

  const reviewCategories = [].concat(...JSON.parse(review.category));
  const reviewKeywords = review.keyword!.map((item: string) => JSON.parse(item));
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  return (
    <div>
      <div className="flex justify-between">
        <h2>리뷰 상세</h2>
        <UtilButtons postId={postId} userId={user.id} />
      </div>
      <div className="flex items-center w-full h-44 p-5 bg-slate-100 rounded-md">
        <div className="h-full relative">
          <Image
            src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
            alt="이미지없음"
            width={300}
            height={450}
            quality={100}
            className="object-cover w-auto h-full rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between lg:ml-3 text-left">
          <strong>{movieData.title}</strong>
          <div>{movieData.release_date.slice(0, 4)}</div>
          <div>{movieData.genres.map((genre: MovieGenre) => `${genre.name} `)}</div>
          <div>{movieData.production_countries[0]['iso_3166_1']}</div>
          <div>{movieData.runtime}분</div>
          <div>{movieData.adult ? '청소년관람불가' : '전체관람가'}</div>
        </div>
      </div>

      <div className="mb-4">
        {/* <div>작성자: {user.username}</div> */}
        <div>{dayjs(review.date).format('YYYY/MM/DD')}</div>

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

        <div>{review.review}</div>

        <div>
          <StarBox defaultValue={review.rating} readOnly={true} />
        </div>

        <div>{review.content}</div>
      </div>
    </div>
  );
};

export default ReviewDetail;
