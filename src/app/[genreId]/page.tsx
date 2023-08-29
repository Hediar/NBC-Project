import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';
import React from 'react';

const GenreMovies = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;
  return (
    <div>
      <KeywordButtons />
      <TrendMoives genreId={genreId} />
    </div>
  );
};

export default GenreMovies;
