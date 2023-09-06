import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import RecordsContainerSmall from '../_Containers/RecordsContainerSmall';

const TotalWatchingTime = async ({ watched_movies }: { watched_movies: Array<string> }) => {
  const calculateMovieWatchedTime = async (watched_movies: Array<string>) => {
    const getTotalMovieRuntime = (resArray: any) => {
      const movieRuntime = resArray.map((movie: any) => movie.runtime);
      const totalMovieRuntime = movieRuntime.reduce((a: number, b: number) => a + b, 0);

      return totalMovieRuntime as number;
    };
    const formatTotalMovieRuntime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      return `${hours}h ${remainingMinutes}m`;
    };

    const movieData = await getMovieDataWithMovieIds(watched_movies);
    const movieTimeInMinutes = getTotalMovieRuntime(movieData);
    if (movieTimeInMinutes === 0) {
      return false;
    }
    const formattedTotalMovieRuntime = formatTotalMovieRuntime(movieTimeInMinutes);

    return formattedTotalMovieRuntime;
  };

  const totalMovieRuntime = await calculateMovieWatchedTime(watched_movies);

  return (
    <RecordsContainerSmall
      key="ffede5"
      bgColor="#ffede5"
      borderColor="#fcd5c4"
      textColor="#f0743f"
      title="영화 본 시간"
      value={totalMovieRuntime ? totalMovieRuntime.toString() : '0'}
    />
  );
};

export default TotalWatchingTime;
