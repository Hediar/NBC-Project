import { getCreditsData } from '@/api/tmdb';
import { ArrowRight } from '@/styles/icons/Icons24';
import Image from 'next/image';
import Link from 'next/link';
import altImage from '../../../../public/anonymous-avatar-icon.png';
import React from 'react';

interface Props {
  movieId: string;
}

const PreviewAppearance = async ({ movieId }: Props) => {
  const { appearences, productions } = await getCreditsData(movieId);

  return (
    <div className="w-4/5 mx-auto">
      <p className="font-bold text-2xl flex items-center mt-20">
        출연<span style={{ fontSize: '0.5px' }}>●</span>제작
      </p>
      <div className="flex justify-between m-5">
        {appearences.map((cast, idx) => {
          if (idx < 4) {
            return (
              <div key={idx} className="flex w-1/4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL + cast.profile_path}`}
                  width={50}
                  height={50}
                  alt=""
                  className="rounded-full"
                />
                <div className="flex flex-col m-2">
                  <span className="font-bold text-base">{cast.name}</span>
                  <p className="text-sm text-gray-500">{cast.character}</p>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="flex justify-between m-5">
        {productions.map((crew, idx) => {
          if (idx < 4) {
            return (
              <div key={idx} className="flex w-1/4">
                {crew.profile_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL + crew.profile_path}`}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                ) : (
                  <Image src={altImage} alt="" width={50} height={50} className="rounded-full" />
                )}
                <div className="flex flex-col m-2">
                  <span className="font-bold text-base">{crew.name}</span>
                  <p className="text-sm text-gray-500">{crew.job}</p>
                </div>
              </div>
            );
          }
        })}
      </div>

      <Link
        href={`/detail/${movieId}/crew`}
        className="flex items-center justify-center border w-full rounded-[20px] text-center subtitle1_suit py-5 mb-20"
      >
        더보기
        <ArrowRight />
      </Link>
    </div>
  );
};

export default PreviewAppearance;
