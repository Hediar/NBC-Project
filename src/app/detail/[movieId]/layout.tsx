import { Suspense } from 'react';
import MovieDetailInfo from '@/components/MovieDetail/MovieDetailInfo';
import { Metadata, ResolvingMetadata } from 'next';
import { getDetailData } from '@/api/tmdb';
import MovieLayoutDiscussion from '@/components/MovieDetail/MovieLayoutDiscussion';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  {
    params
  }: {
    params: {
      movieId: string;
    };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { movieId } = params;
  const movieData = await getDetailData(movieId);

  return {
    title: `${movieData?.title ?? 'null'} - 영화상세 - 무비바바`
  };
}

export default async function MovieDetailLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { movieId: string };
}) {
  const { movieId } = params;

  return (
    <section>
      <MovieDetailInfo movieId={movieId} />

      {children}

      <Suspense>
        <MovieLayoutDiscussion movieId={movieId} />
      </Suspense>
    </section>
  );
}
