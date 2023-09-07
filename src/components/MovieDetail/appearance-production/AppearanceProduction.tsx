import Image from 'next/image';
import React from 'react';
import altImage from '../../../../public/anonymous-avatar-icon.png';

interface Props {
  movieData: MovieData;
}

const AppearanceProduction = ({ movieData }: Props) => {
  const { appearences, productions } = movieData;

  return (
    <div className="flex w-4/5 mx-auto justify-between">
      <div className="flex w-1/2 flex-col gap-3">
        <p>출연</p>
        {appearences.map((cast, idx) => {
          return (
            <div key={idx} className="flex">
              <div>
                {cast.profile_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL + cast.profile_path}`}
                    alt=""
                    width={87}
                    height={126}
                  />
                ) : (
                  <Image src={altImage} alt="" width={87} height={126} />
                )}
              </div>

              <div className="flex flex-col m-2">
                <span className="font-bold text-lg">{cast.name}</span>
                <p className="text-base text-gray-500">{cast.character}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-1/2 flex-col gap-3">
        <p>제작</p>
        {productions.map((crew, idx) => {
          return (
            <div key={idx} className="flex">
              <div>
                {crew.profile_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL + crew.profile_path}`}
                    alt=""
                    width={87}
                    height={126}
                  />
                ) : (
                  <Image src={altImage} alt="" width={87} height={126} />
                )}
              </div>

              <div className="flex flex-col m-2">
                <span className="font-bold text-lg">{crew.name}</span>
                <p className="text-base text-gray-500">{crew.department}</p>
                <p className="text-sm text-gray-500">{crew.job}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppearanceProduction;
