import Header from '@/components/Header/Header';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '무비바바 | 회원가입',
  description: '회원가입 페이지'
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
