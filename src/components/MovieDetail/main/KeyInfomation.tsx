import Image from 'next/image';
import React from 'react';
import altImage from '../../../../public/anonymous-avatar-icon.png';
import Link from 'next/link';
import { ArrowRight, StarFill } from '@/styles/icons/Icons24';
import { SVGTalkEndPoint, SVGTalkStartPoint } from '@/styles/icons/IconsETC';
import { extractMainColors } from '@/api/findColors';

interface Props {
  movieData: MovieData;
}
const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
const KeyInfomation = async ({ movieData }: Props) => {
  const { id: movieId, poster_path, overview, tagline, vote_average, appearences, productions } = movieData;
  const formData = new FormData();
  const imageUrl = `${baseImgUrl}w300_and_h450_bestv2${poster_path}`;
  formData.append('imageUrl', imageUrl.toString());
  const res = await fetch('http://localhost:3000/api/imagecolorpicker', { method: 'post', body: formData });
  const { message: rgb } = await res.json();

  const [rgba1] = extractMainColors(rgb, 1);

  return (
    <div>
      <main
        className="h-[500px] py-[40px]"
        style={{
          background: `linear-gradient(90deg, rgb(34,34,34) 0%, rgba(${rgba1[0]},${rgba1[1]},${rgba1[2]},1) 35%, rgba(235,235,235,1) 100%)`,
          filter: `brightness(1.2)`
        }}
      >
        <div className="flex w-4/5 mx-auto">
          <section>
            <Image
              src={`${baseImgUrl}w300_and_h450_bestv2${poster_path}`}
              alt="Image"
              width={278}
              height={398}
              quality={100}
              className="rounded-lg"
            />
          </section>

          <section id="detail-cont" className="w-[1250px] mx-auto flex flex-col gap-10 px-4 py-10">
            <div className="text-sm h-[300px] flex relative">
              <div
                className="w-[47px] h-[57px] self-end bg-white"
                style={{ clipPath: 'polygon(100% 50%, 0% 100%, 100% 100%)' }}
              ></div>
              <div className="w-full flex flex-col flex-wrap gap-2 justify-center items-center bg-white rounded-2xl rounded-bl-none font-bold text-2xl px-4">
                {tagline && <p>"{tagline}"</p>}
                <span>{overview}</span>
              </div>
              <div className="absolute left-16 top-5">
                <SVGTalkStartPoint />
              </div>
              <div className="absolute right-5 top-5">
                <SVGTalkEndPoint />
              </div>
            </div>

            <div>
              <span className="font-bold text-base text-white flex">
                평균 별점
                <StarFill />
                {(vote_average / 2).toFixed(2)}
              </span>
            </div>
          </section>
        </div>
      </main>

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
      <div className="border-b"></div>
    </div>
  );
};

export default KeyInfomation;
