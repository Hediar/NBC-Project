import React from 'react';
import TrailerSlider from './TrailerSlider';
import Slider from '../../common/Slider/Slider';

interface Props {
  movieData: MovieData;
}

const MovieDetailTrailer = ({ movieData }: Props) => {
  const { trailerKeys, backdropImages } = movieData;

  return (
    <div className="mt-8">
      <div>
        <p className="font-bold text-gray-500 text-2xl">트레일러 {trailerKeys?.length}</p>
        {trailerKeys.length ? (
          <TrailerSlider slideData={trailerKeys} itemNum={4} gap={30} count={1} />
        ) : (
          <p className="flex justify-center font-bold text-base my-10">트레일러가 없습니다.</p>
        )}
      </div>

      <Slider photoData={backdropImages} />
    </div>
  );
};

export default MovieDetailTrailer;
