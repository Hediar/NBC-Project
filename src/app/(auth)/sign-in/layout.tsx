import type { Metadata } from 'next';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from '@/components/Header/Header';
export const metadata: Metadata = {
  title: '무비바바 | 로그인',
  description: '로그인 페이지'
};

export default async function layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (session) {
    redirect('/');
  }
  return <main className="w-full h-[calc(100vh-5rem)]">{children}</main>;
}
