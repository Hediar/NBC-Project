import { MovieBackdropImage, MovieData } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import TrailerSlider from './TrailerSlider';
import PhotoSlider from './PhotoSlider';

type Props = {
  movieData: MovieData;
};

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieDetailTrailer = ({ movieData }: Props) => {
  const { trailerKeys, backdropImages } = movieData;
  const photoData = backdropImages.map((image) => image.file_path);
  return (
    <div>
      <TrailerSlider slideData={trailerKeys} itemNum={4} gap={30} />
      <div>
        {/* <p className="font-bold text-gray-500 mt-10">포토 {backdropImages?.length}</p> */}
        <PhotoSlider slideData={photoData} itemNum={4} gap={30} />
        {/* <div className="flex flex-wrap gap-5">
          {photoData.map((photoURL: string, idx: number) => {
            return (
              <Image
                key={idx}
                src={`${baseImgUrl}w533_and_h300_bestv2${photoURL}`}
                alt=""
                width={266}
                height={150}
                quality={100}
              />
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default MovieDetailTrailer;
