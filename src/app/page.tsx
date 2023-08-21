import TrendMoives from '@/components/TrendMoives';
import Header from '@/components/Header/Header';

export default async function Home() {
  return (
    <>
      <main>
        <Header />
        first page
        <div>
          <TrendMoives />
        </div>
      </main>
    </>
  );
}
