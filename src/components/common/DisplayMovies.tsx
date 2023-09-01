import Image from 'next/image';
import Link from 'next/link';

const DisplayMovies = ({ movieData }: { movieData: MovieFetchResult }) => {
  const movies = movieData.results;
  const content = movies.map((movie) => {
    return (
      <Link href={'/detail/' + movie.id} key={movie.id} className="w-56 h-full flex flex-col gap-2 ">
        <Image
          className="rounded-xl h-2/3"
          alt="poster"
          width={200}
          height={300}
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
        <div className="flex flex-col gap-1 w-full h-1/3">
          <h4 className="text-sm font-bold">{movie.title}</h4>
          <div className="flex gap-2">
            <p className="text-xs">{movie.release_date}</p>
          </div>
        </div>
      </Link>
    );
  });
  return <div className="INLINE_BOX w-10/12 h-96 overflow-scroll">{content}</div>;
};

export default DisplayMovies;
