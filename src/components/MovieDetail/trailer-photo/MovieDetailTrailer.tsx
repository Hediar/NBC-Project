import React from 'react';
import TrailerSlider from './TrailerSlider';
import PhotoSlider from './PhotoSlider';

interface Props {
  movieData: MovieData;
}

const MovieDetailTrailer = ({ movieData }: Props) => {
  const { trailerKeys, backdropImages } = movieData;
  const photoData = backdropImages.map((image) => image.file_path);
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

      <div>
        <p className="font-bold text-gray-500 text-2xl">갤러리 {photoData?.length}</p>
        {photoData.length ? (
          <PhotoSlider slideData={photoData} itemNum={4} gap={30} count={1} />
        ) : (
          <p className="flex justify-center font-bold text-base my-10">갤러리가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailTrailer;
