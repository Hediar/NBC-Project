'use client';

import Image from 'next/image';
import altImage from '../../../../public/anonymous-avatar-icon.png';
import React, { useEffect, useState } from 'react';

interface Props {
  appearences: TMDBCreditCast[];
  productions: TMDBCreditCrew[];
}

const PreviewAppearance = ({ appearences, productions }: Props) => {
  const [appearencesData, setAppearencesData] = useState<TMDBCreditCast[]>([...appearences.slice(0, 9)]);
  const [productionsData, setProductionsData] = useState<TMDBCreditCrew[]>([...productions.slice(0, 9)]);

  useEffect(() => {
    setTimeout(() => {
      setAppearencesData(appearences);
      setProductionsData(productions);
    }, 500);
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <p className="font-bold text-2xl flex items-center mt-20">
        출연<span style={{ fontSize: '0.5px' }}>●</span>제작
      </p>

      <div className="relative">
        <div
          className="w-full h-full absolute right-0"
          style={{ boxShadow: '-39px 0px 29px -14px rgba(222,222,222,0.95) inset' }}
        ></div>
        <div className="flex items-center p-10 gap-2 sm:gap-0 overflow-auto relative mb-10">
          {appearencesData.map((cast, idx) => {
            return (
              <div key={idx} className="flex gap-2 min-w-[300px]">
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
      </div>

      <div className="relative">
        <div
          className="w-full h-full absolute right-0"
          style={{ boxShadow: '-39px 0px 29px -14px rgba(222,222,222,0.95) inset' }}
        ></div>
        <div className="flex items-center p-10 gap-2 sm:gap-0 overflow-auto relative">
          {productionsData.map((crew, idx) => {
            return (
              <div key={idx} className="flex gap-2 min-w-[300px]">
                <div className={`${Style.profileImgDiv}`}>
                  {crew.profile_path ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL + crew.profile_path}`}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded-full"
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII="
                    />
                  ) : (
                    <Image
                      src={altImage}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded-full"
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII="
                    />
                  )}
                </div>

                <div className="m-2">
                  <span className={`${Style.name}`}>{crew.name}</span>
                  <p className={`${Style.otherInfo}`}>{crew.job}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-20"></div>
    </div>
  );
};

export default PreviewAppearance;

const Style = {
  infoDiv: 'w-1/2 flex flex-col gap-5',
  profileImgDiv: 'min-w-[80px] h-[80px] flex bg-zinc-300 rounded-full shadow1',
  name: 'text-neutral-800 text-xl font-bold leading-normal',
  otherInfo: 'text-neutral-800 text-sm font-normal leading-snug'
};
