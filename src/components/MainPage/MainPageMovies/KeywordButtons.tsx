import { MOVIE_GENRES } from '@/static/movieGenres';
import Link from 'next/link';

const KeywordButtons = ({ params }: { params: string }) => {
  const genres = MOVIE_GENRES;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {genres?.map((genre: MovieGenre, idx: number) => {
          {
            return (
              <Link
                key={genre.name}
                href={`/${genre.id}`}
                className={`rounded-3xl border border-gray-300 bg-white px-5 py-2.5 flex items-center ${
                  (!params && genre.name === '전체') ||
                  (params === 'all' && genre.name === '전체') ||
                  (params && Number(params) === genre.id)
                    ? '!bg-black text-white'
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
    </div>
  );
};

export default KeywordButtons;
