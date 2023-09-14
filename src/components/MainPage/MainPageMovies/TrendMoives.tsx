import { fetchTrendMoviesByGenre, getTrendingMovies } from '@/api/tmdb';
import TrendMovieSlider from './TrendMovieSlider';
import MovieItem from '@/components/common/MovieItem';

const TrendMoives = async ({ genreId }: { genreId: string }) => {
  let trendMovies;

  if (genreId === 'all') {
    trendMovies = await getTrendingMovies();
  } else {
    trendMovies = await fetchTrendMoviesByGenre(genreId);
  }
  const filteredMovies = trendMovies.results;
  const sliderMovies = filteredMovies.slice(0, 8);
  const listMovies = filteredMovies.slice(8, 14);
  return (
    <>
      <TrendMovieSlider photoData={sliderMovies} />
      <div className="flex overflow-x-scroll sm:overflow-x-hidden sm:flex-wrap justify-center items-center mx-11 gap-6">
        {listMovies.map((movie: MovieData, idx: number) => (
          <div key={movie.id} className="w-auto md:w-[240px]">
            <MovieItem movie={movie} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TrendMoives;
