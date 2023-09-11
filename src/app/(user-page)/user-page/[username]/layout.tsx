import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import UserPageTabs from '@/components/UserPage/UserPageTabs';
import HiddenUserPageTabs from '@/components/UserPage/HiddenUserPageTabs';
import doesUsersMatch from '@/api/doesUserMatch';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

interface Params {
  params: {
    username: string;
  };
}

export const generateMetadata = async ({ params: { username } }: Params): Promise<Metadata> => {
  const decodedUsername = decodeURIComponent(username);
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: usernameData } = await supabase.from('users').select('username').eq('username', decodedUsername);

  if (usernameData && usernameData.length < 1) {
    return { title: '존재하지 않는 유저입니다.', description: '존재하지 않는 유저의 페이지입니다.' };
  }

  return {
    title: `${decodedUsername}의 페이지 | 영화를 봅시다`,
    description: `${decodedUsername}의 마이 페이지에 오신걸 환영합니다!`
  };
};

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const decodedUsername = decodeURIComponent(params.username);
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: usernameData } = await supabase.from('users').select('username').eq('username', decodedUsername);

  if (usernameData && usernameData.length === 0) notFound();

  const userMatch = await doesUsersMatch(supabase, decodedUsername);

  return (
    <main className="bg-white flex-col sm:flex-row flex justify-center sm:h-[calc(100vh-370px)] pb-5">
      <aside className="sm:w-1/6 md:w-3/12 lg:w-2/12 border-r border-[#ebebeb] bg-[#fffdf9] ">
        <UserPageTabs username={decodedUsername} userMatch={userMatch} />
        <HiddenUserPageTabs username={decodedUsername} userMatch={userMatch} />
      </aside>
      <section className="overflow-scroll h-full w-full change sm:w-5/6 md:w-9/12 lg:w-10/12 flex flex-col items-center">
        {children}
      </section>
    </main>
  );
}
