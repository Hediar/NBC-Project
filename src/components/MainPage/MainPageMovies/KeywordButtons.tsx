import { MOVIE_GENRES } from '@/static/movieGenres';
import Link from 'next/link';

const KeywordButtons = ({ params }: { params: string }) => {
  const genres = MOVIE_GENRES;

  return (
    <div className="p-5 overflow-scroll flex ">
      {genres?.map((genre: MovieGenre, idx: number) => {
        {
          return (
            <Link
              key={genre.name}
              href={`/${genre.id}`}
              className={`block mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-2 px-4 rounded ${
                (!params && genre.name === '전체') ||
                (params === 'all' && genre.name === '전체') ||
                (params && Number(params) === genre.id)
                  ? 'bg-blue-700'
                  : ''
              }`}
            >
              {' '}
              # {genre.name}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default KeywordButtons;
