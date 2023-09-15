import Image from 'next/image';
import React from 'react';
import { StarFillWhite, StarLine } from '@/styles/icons/Icons24';
import { SVGTalkEndPoint, SVGTalkStartPoint } from '@/styles/icons/IconsETC';
import { extractMainColors, findBrightestTwoColors, getColors } from '@/util/findColors';
import PreviewAppearance from './PreviewAppearance';
import { getCreditsData, getDetailData } from '@/api/tmdb';

interface Props {
  movieId: string;
}

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const KeyInfomation = async ({ movieId }: Props) => {
  const [{ poster_path, overview, tagline, vote_average }, { appearences, productions }] = await Promise.all([
    (await getDetailData(movieId)) as MovieData,
    (await getCreditsData(movieId)) as MovieCreditData
  ]);
  const rgb = await getColors(`${baseImgUrl}w300_and_h450_bestv2${poster_path}`);
  const [rgba1] = extractMainColors(rgb, 1);
  const [darknessRGB, brightnessRGB] = findBrightestTwoColors(rgb);

  return (
    <div>
      <main
        className="h-[440px] py-[40px] relative"
        style={{
          background: `linear-gradient(90deg, rgb(${darknessRGB[0]},${darknessRGB[1]},${darknessRGB[2]}) 0%, rgba(${rgba1[0]},${rgba1[1]},${rgba1[2]},1) 35%, rgba(${brightnessRGB[0]},${brightnessRGB[1]},${brightnessRGB[2]},1) 100%)`
        }}
      >
        <div className="w-full h-full left-0 top-0 absolute bg-gradient-to-b from-white to-white opacity-10" />
        <div className="flex w-full sm:w-4/5 mx-auto relative">
          <section className="w-1/3 absolute top-24 sm:top-auto lg:relative">
            <Image
              src={`${baseImgUrl}w300_and_h450_bestv2${poster_path}`}
              alt="Image"
              width={240}
              height={360}
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII="
              className="rounded-[10px]"
            />
          </section>
          <section
            id="detail-cont"
            className="w-2/3 absolute right-0 lg:relative sm:w-2/3 lg:w-[95%] mx-auto flex flex-col gap-10 px-4 py-2 opacity-70 "
          >
            <div className="text-sm h-[300px] flex relative">
              <div
                className="w-[4%] h-[30px] self-end bg-white"
                style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
              ></div>
              <div className="w-full sm:w-[96%] flex justify-center items-center bg-white rounded-tl-[60px] rounded-tr-[60px] rounded-br-[60px] border-none custom_mobile_suit sm:text-[24px] sm:leading-[30px] px-5 py-20 ">
                <div className="h-full flex flex-col gap-1 items-center overflow-auto">
                  {tagline && <p>"{tagline}"</p>}
                  <p>{overview}</p>
                  {!tagline && !overview && <p>…….</p>}
                </div>
                <div className="absolute left-5 sm:left-8 lg:left-12 top-5 px-5">
                  <SVGTalkStartPoint />
                </div>
                <div className="absolute bottom-5 right-5 sm:top-5 px-5">
                  <SVGTalkEndPoint />
                </div>
              </div>
            </div>
            <div>
              <span className="font-bold text-base text-white flex">
                평균 별점
                <StarFillWhite />
                {(vote_average / 2).toFixed(2)}
              </span>
            </div>
          </section>
        </div>
      </main>
      <PreviewAppearance appearences={appearences} productions={productions} />
      <div className="border-b"></div>
    </div>
  );
};

export default KeyInfomation;
