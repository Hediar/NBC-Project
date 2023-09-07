import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const RedirectToUserPageOrHome = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: signedInUser, error } = await supabase.auth.getUser();

  // 로그인하지 않은 유저가 접근하면 홈으로 보내기
  if (error) {
    return redirect('/');
  }

  const signedInUserId = signedInUser.user.id;
  const { data: signedInUsernameData, error: err } = await supabase
    .from('users')
    .select('username')
    .eq('id', signedInUserId)
    .single();

  if (err) {
    // console.log(err);
  }

  const signedInUsername = signedInUsernameData!.username;

  // 로그인한 유저가 접근하면 해당 유저의 마이페이지의 info로 보내기
  return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/user-page/${signedInUsername}/info`);
};

export default RedirectToUserPageOrHome;
