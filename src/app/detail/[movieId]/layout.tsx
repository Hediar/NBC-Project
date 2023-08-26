import MovieDetailInfo from '@/components/MovieDetail/MovieDetailInfo';
import Discussion from '@/components/MovieDetail/discussion/Discussion';

export default function MovieDetailLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { movieId: string };
}) {
  const { movieId } = params;

  return (
    <section style={{ width: '80%', margin: '0 auto' }}>
      <MovieDetailInfo movieId={movieId} />
      {children}
      <Discussion />
    </section>
  );
}
