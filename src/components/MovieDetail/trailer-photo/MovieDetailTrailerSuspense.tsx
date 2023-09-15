import React from 'react';
import Slider from './GallerySlider';
import TrailerSlider from './TrailerSlider';

const MovieDetailTrailerSuspense = async () => {
  const DUMMY_NUMBER = 4;

  const trailerDummylists = new Array(DUMMY_NUMBER).fill('DUMMY');
  const photoDummylists = new Array(DUMMY_NUMBER).fill({ file_path: 'DUMMY' });
  return (
    <div className="animate-pulse mt-10 mb-20">
      <div className="w-4/5 mx-auto">
        <p className="font-bold text-gray-500 text-2xl mb-5">트레일러 </p>
        <div className="bg-slate-200">
          <TrailerSlider trailerKeys={trailerDummylists} />
        </div>

        <p className="font-bold text-gray-500 text-2xl mt-20 mb-5">갤러리 </p>
        <div className="bg-slate-200">
          <Slider photoData={photoDummylists} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailTrailerSuspense;
