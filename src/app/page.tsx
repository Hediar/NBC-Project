import MainPage from '@/components/MainPage/MainPage';
import NewLoading from '@/components/common/NewLoading';
import { Suspense } from 'react';

export const revalidate = 0;

export default async function Home() {
  return (
    <Suspense fallback={<NewLoading />}>
      <MainPage params="all" />
    </Suspense>
  );
}
