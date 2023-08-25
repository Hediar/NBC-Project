// import supabase from '@/api/supabase-public';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import UserPageTabs from '@/components/UserPage/UserPageTabs';
export const dynamic = 'force-dynamic';
interface Params {
  params: {
    username: string;
  };
}

export const generateMetadata = async ({ params: { username } }: Params): Promise<Metadata> => {
  const decodedUsername = decodeURIComponent(username);
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('users').select('username').eq('username', decodedUsername);

  if (data && data.length < 1) {
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
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('users').select('username').eq('username', decodedUsername);

  if (data && data.length < 1) notFound();

  return (
    <main className="flex flex-col items-center bg-slate-50 w-full">
      <UserPageTabs username={decodedUsername} />
      {children}
    </main>
  );
}

// const userData = getUser(userId);
// const userPostData = getUserPosts(userId);
// 여기에서 이 것들을 쓴다음 promise 상태인 부분을 써야하는 컴포넌트에 내려주고 await해주면 promise all과 같은 효과가 나온다. 그리고 로딩도 더 빠를 듯
// 추가로 suspense도 해주면 좋다.
