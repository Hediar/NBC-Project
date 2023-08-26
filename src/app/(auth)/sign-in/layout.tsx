import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '무비바바 | 로그인',
  description: '로그인 페이지'
};

export default async function layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // 로그인 되어있으면 홈으로 바로 보내기
  if (session) {
    redirect('/');
  }
  return <main className="w-full h-[calc(100vh-5rem)]">{children}</main>;
}
