import { getNewMovies } from '@/api/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

export const revailidate = 0;

const LatestMovies = async () => {
  const currentDate = dayjs();
  const oneMonthPrev = currentDate.subtract(1, 'month');

  const formattedCurrentDate = currentDate.format('YYYY-MM-DD');
  const formattedOneMonthPrev = oneMonthPrev.format('YYYY-MM-DD');
  const data = await getNewMovies(formattedCurrentDate, formattedOneMonthPrev);
  const newMovies = data.results;

  return (
    <div className="p-5">
      <h2 className="text-2xl">최신 영화</h2>
      <div className="p-5">
        <div className="overflow-x-scroll flex">
          {newMovies?.map((movie: MovieData, idx: number) => {
            return (
              <div className="flex-none py-6 px-3 first:pl-6 last:pr-6" key={movie.id}>
                <div>
                  <div>
                    {movie.title} {movie.id}
                  </div>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/detail/${movie.id}/main`}
                    className="w-56 h-full flex flex-col gap-2 items-center"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}t/p/w200${movie.poster_path}`}
                      alt=""
                      width={200}
                      height={420}
                      priority={false}
                    ></Image>
                  </Link>
                  <div>{movie.release_date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestMovies;
