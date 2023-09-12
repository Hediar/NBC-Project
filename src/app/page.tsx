import MainPage from '@/components/MainPage/MainPage';
import { Suspense } from 'react';

export const revalidate = 0;

export default async function Home() {
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <MainPage params="all" />
    </Suspense>
  );
}
