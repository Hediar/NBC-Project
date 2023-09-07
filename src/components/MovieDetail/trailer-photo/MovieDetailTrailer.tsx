import React from 'react';
import Slider from '../../common/Slider/Slider';
import TrailerSlider from './TrailerSlider';

interface Props {
  movieData: MovieData;
}

const MovieDetailTrailer = ({ movieData }: Props) => {
  const { trailerKeys, backdropImages } = movieData;

  return (
    <div className="mt-10 mb-20">
      <div className="w-4/5 mx-auto">
        <p className="font-bold text-gray-500 text-2xl mb-5">트레일러 {trailerKeys?.length}</p>
        {trailerKeys.length ? (
          <TrailerSlider trailerKeys={trailerKeys} />
        ) : (
          <p className="flex justify-center font-bold text-base my-10">트레일러가 없습니다.</p>
        )}

        <p className="font-bold text-gray-500 text-2xl mt-20 mb-5">갤러리 {backdropImages?.length}</p>
        {backdropImages.length ? (
          <Slider photoData={backdropImages} />
        ) : (
          <p className="flex justify-center font-bold text-base my-10">갤러리가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailTrailer;
