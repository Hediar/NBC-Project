import { MovieBackdropImage, MovieData } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import Slider from './Slider';

type Props = {
  movieData: MovieData;
};

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieDetailTrailer = ({ movieData }: Props) => {
  const { trailerKeys, backdropImages } = movieData;

  return (
    <div>
      <Slider data={trailerKeys} />
      <div>
        <p className="font-bold text-gray-500 mt-10">포토 {backdropImages?.length}</p>
        <div className="flex flex-wrap gap-5">
          {backdropImages.map((image: MovieBackdropImage, idx: number) => {
            return (
              <Image
                key={idx}
                src={`${baseImgUrl}w533_and_h300_bestv2${image.file_path}`}
                alt=""
                width={266}
                height={150}
                quality={100}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailTrailer;
