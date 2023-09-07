import MainPage from '@/components/MainPage/MainPage';

export const revalidate = 0;

export default async function Home() {
  return <MainPage params="all" />;
}
