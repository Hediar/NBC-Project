import MovieDetailInfo from '@/components/MovieDetail/MovieDetailInfo';
import Discussion from '@/components/MovieDetail/discussion/Discussion';
import { Params } from '@/types/types';

export default function MovieDetailLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { movieId } = params;

  return (
    <section style={{ width: '80%', margin: '0 auto' }}>
      <MovieDetailInfo movieId={movieId} />
      {children}
      <Discussion />
    </section>
  );
}
