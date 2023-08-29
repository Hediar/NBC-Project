import LatestMovies from '@/components/MainPage/LatestMovies';
import LatestReviews from '@/components/MainPage/LatestReviews';
import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';
import React from 'react';

const GenreMovies = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;
  return (
    <main>
      <KeywordButtons />
      <TrendMoives genreId={genreId} />
      <LatestReviews />
      <LatestMovies />
    </main>
  );
};

export default GenreMovies;
