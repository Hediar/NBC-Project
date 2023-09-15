import MainPage from '@/components/MainPage/MainPage';
import MainPageSkeleton from '@/components/MainPage/MainPageSkeleton';
import { Suspense } from 'react';

export const revalidate = 1;

export default async function Home() {
  return (
    <Suspense fallback={<MainPageSkeleton params="all" />}>
      <MainPage params="all" />
    </Suspense>
  );
}
