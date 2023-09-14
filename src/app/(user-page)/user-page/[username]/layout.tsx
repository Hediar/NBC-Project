import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UserPageTabs from '@/components/UserPage/UserPageTabs';
import HiddenUserPageTabs from '@/components/UserPage/HiddenUserPageTabs';
import doesUserExist from '@/util/supabase/userPage/doesUserExist';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import doesUsersMatch from '@/api/doesUserMatch';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface Params {
  params: {
    username: string;
  };
}

export const dynamic = 'force-dynamic';

export const generateMetadata = async ({ params: { username } }: Params): Promise<Metadata> => {
  const pageUsername = decodeURIComponent(username);
  const { userExist } = await doesUserExist(pageUsername);

  if (!userExist) {
    return { title: '존재하지 않는 유저입니다.', description: '존재하지 않는 유저의 페이지입니다.' };
  } else {
    return {
      title: `${pageUsername}의 페이지 | 영화를 봅시다`,
      description: `${pageUsername}의 마이 페이지에 오신걸 환영합니다!`
    };
  }
};

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const pageUsername = decodeURIComponent(params.username);
  const { userExist } = await doesUserExist(pageUsername);
  if (!userExist) notFound();

  const supabase = createServerComponentClient({ cookies });
  const isUserMatchPromise = doesUsersMatch(supabase, pageUsername);

  return (
    <main className="bg-white flex-col sm:flex-row flex justify-center  pb-5 sm:pb-0 sm:min-h-[calc(100vh-370px)]">
      <aside className="sm:w-1/6 md:w-3/12 lg:w-2/12 border-r border-[#ebebeb] bg-[#fffdf9] ">
        <Suspense fallback={<LoadingSpinner />}>
          <UserPageTabs username={pageUsername} isUserMatchPromise={isUserMatchPromise} />
        </Suspense>
        <HiddenUserPageTabs username={pageUsername} isUserMatchPromise={isUserMatchPromise} />
      </aside>
      <div className="overflow-scroll h-full w-full change sm:w-5/6 md:w-9/12 lg:w-10/12 flex flex-col items-center">
        {children}
      </div>
    </main>
  );
}
