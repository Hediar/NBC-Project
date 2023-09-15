import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '토론작성 - 무비바바'
};

export default async function DiscussionRegistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap shadow1">
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  );
}
