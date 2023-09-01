import Image from 'next/image';
import React from 'react';
import altImage from '../../../../public/anonymous-avatar-icon.png';
import Link from 'next/link';

interface Props {
  movieData: MovieData;
}
const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
const KeyInfomation = ({ movieData }: Props) => {
  const { id: movieId, poster_path, overview, tagline, vote_average, appearences, productions } = movieData;

  return (
    <div>
      <div className="flex mb-10">
        <div>
          <Image
            src={`${baseImgUrl}w300_and_h450_bestv2${poster_path}`}
            alt=""
            width={220}
            height={330}
            quality={100}
            className="rounded-lg"
          />
        </div>
        <div id="detail-cont" className="w-[80%] flex flex-col justify-between p-5">
          <div className="text-sm">
            <p className="font-bold text-base mb-1">{tagline}</p>
            <span>{overview}</span>
          </div>
          <div>
            <p className="font-bold text-base">평점: {vote_average.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold text-2xl flex items-center">
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
        <div className="flex justify-center items-center">
          <Link href={`/detail/${movieId}/crew`} className="border rounded-xl text-sm px-2 py-1">
            더보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KeyInfomation;
