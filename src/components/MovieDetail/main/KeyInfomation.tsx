import Image from 'next/image';
import React from 'react';
import { StarFill } from '@/styles/icons/Icons24';
import { SVGTalkEndPoint, SVGTalkStartPoint } from '@/styles/icons/IconsETC';
import { extractMainColors } from '@/api/findColors';
import PreviewAppearance from './PreviewAppearance';
import { getDetailData } from '@/api/tmdb';

interface Props {
  movieId: string;
}
const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const KeyInfomation = async ({ movieId }: Props) => {
  const { poster_path, overview, tagline, vote_average } = await getDetailData(movieId);
  const formData = new FormData();
  const imageUrl = `${baseImgUrl}w300_and_h450_bestv2${poster_path}`;
  formData.append('imageUrl', imageUrl.toString());
  const res = await fetch(`${process.env.BASE_URL}/api/imagecolorpicker`, { method: 'post', body: formData });
  const { message: rgb } = await res.json();
  const [rgba1] = extractMainColors(rgb, 1);

  return (
    <div>
      <main
        className="h-[500px] py-[40px] relative"
        style={{
          background: `linear-gradient(90deg, rgb(34,34,34) 0%, rgba(${rgba1[0]},${rgba1[1]},${rgba1[2]},1) 35%, rgba(235,235,235,1) 100%)`,
          filter: `brightness(1.2)`
        }}
      >
        <div className="flex w-full sm:w-4/5 mx-auto relative">
          <section className="w-1/3 absolute top-24 sm:top-auto sm:relative">
            <Image
              src={`${baseImgUrl}w300_and_h450_bestv2${poster_path}`}
              alt="Image"
              width={278}
              height={398}
              quality={100}
              className="rounded-[10px]"
            />
          </section>
          <section
            id="detail-cont"
            className="w-2/3 absolute right-0 sm:relative sm:w-[1250px] mx-auto flex flex-col gap-10 px-4 py-10"
          >
            <div className="text-sm h-[300px] flex relative">
              <div
                className="w-[47px] h-[57px] self-end bg-white"
                style={{ clipPath: 'polygon(100% 50%, 0% 100%, 100% 100%)' }}
              ></div>
              <div className="w-full flex justify-center items-center bg-white rounded-2xl rounded-bl-none custom_mobile_suit sm:h4_suit px-5 py-20 ">
                <div className="h-full flex flex-col gap-1 items-center overflow-auto">
                  {tagline && <p className="inline-block">"{tagline}"</p>}
                  <p>{overview}</p>
                </div>
              </div>
              <div className="absolute left-16 top-5">
                <SVGTalkStartPoint />
              </div>
              <div className="absolute bottom-5 right-5 sm:top-5">
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
      <PreviewAppearance movieId={movieId} />
      <div className="border-b"></div>
    </div>
  );
};

export default KeyInfomation;
