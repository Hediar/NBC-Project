import MainPage from '@/components/MainPage/MainPage';

export const revalidate = 0;

const GenreMovies = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;
  return <MainPage params={genreId} />;
};

export default GenreMovies;
