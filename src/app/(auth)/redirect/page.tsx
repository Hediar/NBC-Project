import LoadingFriends from '@/styles/svg/LoadingFriends';
import authApi from '@/util/supabase/auth/auth';
import publicApi from '@/util/supabase/auth/public';
import generateUniqueRandomUsername from '@/api/generateUsername/generateUniqueRandomUsername';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { 'sign-up-success': 'true' };
}

const RedirectPage = async ({ searchParams }: Props) => {
  if (searchParams['sign-up-success'] === 'true') {
    const { userId } = await authApi.get('userId');

    if (userId) {
      const { username } = await publicApi.get('id to username', { id: userId });
      if (!username) {
        const supabase = createServerComponentClient({ cookies });
        const newUsername = await generateUniqueRandomUsername(supabase);

        const { data, error } = await supabase
          .from('users')
          .update({ username: newUsername })
          .match({ id: userId })
          .select();
        if (error) {
          redirect('/');
        }
      } else {
        redirect('/');
      }
    }
  }
  redirect('/');

  return (
    <main className="w-full h-[calc(100vh-370px)] flex justify-center items-center flex-col gap-1">
      <LoadingFriends className="hidden sm:block" />
      <LoadingFriends width={200} height={100} className="sm:hidden" />
      <h1 className="text-base text-neutral-800 sm:text-[32px] font-bold sm:mb-5">잠시만 기다려 주세요.</h1>
      <p className="text-sm text-neutral-800 sm:text-xl font-normal">페이지로 이동 중입니다</p>
    </main>
  );
};

export default RedirectPage;
