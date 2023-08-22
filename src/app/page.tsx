import TrendMoives from '@/components/TrendMoives';
import Header from '@/components/Header/Header';
import { getGenres } from '@/api/tmdb';
import { MovieGenre } from '@/types/types';

export default async function Home() {
  const genres = await getGenres();
  const genreData = genres.genres;
  console.log(genres.genres);
  return (
    <>
      <main>
        <Header />
        {genreData.map((genre: MovieGenre, idx: number) => {
          return (
            <>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {genre.name}
              </button>
            </>
          );
        })}

        <div>
          <TrendMoives />
        </div>
      </main>
    </>
  );
}
