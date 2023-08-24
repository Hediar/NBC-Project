/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const DisplayMoviesWIthMovieIds = ({ movieData }: { movieData: [Movie] }) => {
  console.log(movieData);
  const content = movieData.map((movie: Movie) => {
    return (
      <Link href={'/detail/' + movie.id} key={movie.id} className="w-56 h-full flex flex-col gap-2 ">
        <img className="rounded-xl h-2/3" alt="poster" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
        <div className="flex flex-col gap-1 w-full h-1/3">
          <h4 className="text-sm font-bold">{movie.title}</h4>
          <div className="flex gap-2">
            <p className="text-xs">{movie.release_date}</p>
          </div>
        </div>
      </Link>
    );
  });
  return <>{content}</>;
};

export default DisplayMoviesWIthMovieIds;
