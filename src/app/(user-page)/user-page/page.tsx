import authApi from '@/util/supabase/auth/auth';
import publicApi from '@/util/supabase/auth/public';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const RedirectToUserPageOrHome = async () => {
  const { session } = await authApi.get('session');

  if (!session) {
    return redirect('/');
  }

  const signedInUserId = session.user.id;
  const { username: signedInUsername } = await publicApi.get('id to username', { id: signedInUserId });

  return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/user-page/${signedInUsername}/info`);
};

export default RedirectToUserPageOrHome;
