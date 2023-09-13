import { MOVIE_GENRES } from '@/static/movieGenres';
import Link from 'next/link';

const KeywordButtons = ({ params }: { params: string }) => {
  const genres = MOVIE_GENRES;

  return (
    <div>
      <div className="flex gap-2 items-start content-start px-5.625 overflow-auto sm:flex-wrap">
        {genres?.map((genre: MovieGenre, idx: number) => {
          {
            return (
              <Link
                key={genre.name}
                href={`/${genre.id}`}
                className={`rounded-3xl flex border border-zinc-300 bg-white hover:bg-[#F2F5FD] px-5 py-2.5 items-center ${
                  (!params && genre.name === '전체') ||
                  (params === 'all' && genre.name === '전체') ||
                  (params && Number(params) === genre.id)
                    ? '!bg-black text-white'
                    : ''
                }`}
              >
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
