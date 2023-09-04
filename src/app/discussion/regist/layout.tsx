import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: `토론작성 - 무비바바`
  };
}

export default async function MovieDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
