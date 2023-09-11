import Image from 'next/image';
import React from 'react';
import altImage from '../../../../public/anonymous-avatar-icon.png';
import { getCreditsData } from '@/api/tmdb';

interface Props {
  movieId: string;
}

const AppearanceProduction = async ({ movieId }: Props) => {
  const { appearences, productions } = await getCreditsData(movieId);

  return (
    <div className="flex w-4/5 mx-auto justify-between">
      <div className={`${Style.infoDiv}`}>
        <p>출연</p>
        {appearences.map((cast, idx) => {
          return (
            <div key={idx} className="flex">
              <div className={`${Style.profileImgDiv}`}>
                {cast.profile_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL + cast.profile_path}`}
                    alt=""
                    width={80}
                    height={80}
                    className="rounded-full"
                    placeholder="blur"
                    blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII="
                  />
                ) : (
                  <Image src={altImage} alt="" width={80} height={80} className="rounded-full" />
                )}
              </div>

              <div className="m-2">
                <span className={`${Style.name}`}>{cast.name}</span>
                <p className={`${Style.otherInfo}`}>{cast.character}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${Style.infoDiv}`}>
        <p>제작</p>
        {productions.map((crew, idx) => {
          return (
            <div key={idx} className="flex">
              <div className={`${Style.profileImgDiv}`}>
                {crew.profile_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL + crew.profile_path}`}
                    alt=""
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                ) : (
                  <Image src={altImage} alt="" width={80} height={80} className="rounded-full" />
                )}
              </div>

              <div className="m-2">
                <span className={`${Style.name}`}>{crew.name}</span>
                <p className={`${Style.otherInfo}`}>{crew.department}</p>
                <p className={`${Style.otherInfo}`}>{crew.job}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppearanceProduction;

const Style = {
  infoDiv: 'w-1/2 flex flex-col gap-5',
  profileImgDiv: 'w-[80px] h-[80px] flex',
  name: 'text-neutral-800 text-sm sm:text-xl font-bold leading-normal',
  otherInfo: 'text-neutral-800 text-xs sm:text-sm font-normal leading-snug'
};
