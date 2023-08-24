import { MovieData } from '@/types/types';
import React from 'react';
import TrailerSlider from './TrailerSlider';
import PhotoSlider from './PhotoSlider';

type Props = {
  movieData: MovieData;
};

const MovieDetailTrailer = ({ movieData }: Props) => {
  const { trailerKeys, backdropImages } = movieData;
  const photoData = backdropImages.map((image) => image.file_path);
  return (
    <div className="mt-8">
      <div>
        <p className="font-bold text-gray-500 text-2xl">트레일러 {trailerKeys?.length}</p>
        <TrailerSlider slideData={trailerKeys} itemNum={4} gap={30} count={1} />
      </div>

      <div>
        <p className="font-bold text-gray-500 text-2xl">갤러리 {photoData?.length}</p>
        <PhotoSlider slideData={photoData} itemNum={4} gap={30} count={1} />
      </div>
    </div>
  );
};

export default MovieDetailTrailer;
