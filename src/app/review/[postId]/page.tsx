import { getDetailData } from '@/api/tmdb';
import StarBox from '@/components/ReviewForm/StarBox';
import UtilButtons from '@/components/ReviewForm/UtilButtons';
import supabase from '@/supabase/config';
import Image from 'next/image';
import React from 'react';
import dayjs from 'dayjs';
import { getUserProfile } from '@/api/review';
import ReviewLikes from '@/components/Review/ReviewLikes';
import WatchLaterButton from '@/components/common/Buttons/WatchLaterButton';
import MovieLikes from '@/components/common/Buttons/MovieLikes';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Params {
  postId: string;
}

type Props = {
  params: Params;
};

const ReviewDetailPage = async ({ params }: Props) => {
  const { postId } = params;

  const { data: review, error } = await supabase.from('reviews').select('*').eq('reviewid', postId).single();
  const user = await getUserProfile(review.userid);
  const movieData = await getDetailData(review.movieid);

  const reviewCategories = [].concat(...JSON.parse(review.category));
  const reviewKeywords = review.keyword!.map((item: string) => JSON.parse(item));
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  if (movieData)
    return (
      <div>
        <p className="mt-10 h3_suit">리뷰 상세</p>
        <div className="flex items-center w-full mt-5 mb-10 px-10 py-5 rounded-[20px] shadow1 border">
          <div className="relative h-full">
            <Image
              src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
              alt="포스터 이미지"
              width={100}
              height={150}
              quality={100}
              className="rounded-lg"
            />
            <div className=" bg-gray-800 bg-opacity-30 rounded-lg py-1 px-1 absolute top-[2px] right-[2px] flex flex-col gap-[3px] items-center">
              <WatchLaterButton movieId={review.movieid} />
              <MovieLikes movieid={review.movieid} />
            </div>
          </div>
          <div className="flex flex-col gap-3 ml-6">
            <strong className="h4_suit">{movieData.title}</strong>
            <div className=" body1_regular_suit text-[#888888]">
              <div className="flex">
                {movieData.release_date.slice(0, 4)}
                <div className="flex items-center justify-center p-1">
                  <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="1" cy="1" r="1" fill="#888888" />
                  </svg>
                </div>

                {movieData.genres.map((genre: MovieGenre, idx: number) =>
                  idx === movieData.genres.length - 1 ? `${genre.name}` : `${genre.name}/`
                )}
              </div>
              <div>{movieData.production_countries?.length && movieData.production_countries[0]['iso_3166_1']}</div>
              <div>{movieData.runtime}분</div>
              <div>{movieData.adult ? '청소년관람불가' : '전체관람가'}</div>
            </div>
          </div>
        </div>

        {/* 컨텐츠 S */}
        <div className="overflow-hidden mb-4 rounded-[20px] border border-zinc-500">
          <div className="flex items-center h-[60px] px-5 py-2 ">
            <div className="w-10 h-10 bg-white rounded-full border border-gray-200 overflow-hidden flex content-center justify-center">
              <Image
                className="w-full"
                src={`${user!.avatar_url}`}
                alt="프로필 이미지"
                width={40}
                height={40}
                quality={100}
              />
            </div>
            <div className="pl-2 text-neutral-800 text-base font-bold leading-snug">{user!.username}</div>
            <span className="pl-5 text-neutral-800 text-sm font-normal">
              {dayjs(review.created_at).format('YYYY.MM.DD')}
            </span>

            <div className="ml-auto">
              <UtilButtons postId={postId} userId={review.userid} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 py-14 px-5  bg-neutral-50 border-y border-zinc-500 text-neutral-800 text-base font-normal">
            <div>{dayjs(review.date).format('YYYY/MM/DD')}</div>

            <ul className="flex flex-wrap gap-3 justify-center">
              {reviewCategories.map((category: string, i: number) => (
                <li
                  key={category + i}
                  className="min-w-[70px] h-[38px] px-4 py-2 bg-white rounded-[22px] border border-zinc-300 justify-center items-center gap-2.5 inline-flex text-neutral-800 text-base font-normal leading-snug"
                >
                  {category}
                </li>
              ))}
              {reviewKeywords.map((keyword: { value: string }, i: number) => (
                <li
                  key={i}
                  className="min-w-[70px] h-[38px] px-4 py-2 bg-white rounded-[22px] border border-zinc-300 justify-center items-center gap-2.5 inline-flex text-neutral-800 text-base font-normal leading-snug"
                >
                  {keyword.value}
                </li>
              ))}
            </ul>

            <p className="text-center">{review.review}</p>

            <div>
              <StarBox defaultValue={review.rating} readOnly={true} />
            </div>

            <pre className="text-center">{review.content}</pre>
          </div>

          <div className="flex justify-center items-center h-16 px-5 ">
            <ReviewLikes reviewid={review.reviewid} size="32" />
          </div>
        </div>
        {/* 컨텐츠 E */}
      </div>
    );
};

export default ReviewDetailPage;
