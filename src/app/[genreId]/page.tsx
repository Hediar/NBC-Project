import KeywordButtons from '@/components/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPageMovies/TrendMoives';
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
