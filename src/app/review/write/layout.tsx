import { Metadata } from 'next';
import { ReactNode } from 'react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: '리뷰 - 무비바바'
};

export default async function ReviewLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
