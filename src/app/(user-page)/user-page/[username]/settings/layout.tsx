import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';

interface Params {
  params: {
    username: string;
  };
}

export const generateMetadata = ({ params: { username } }: Params) => {
  const decodedUsername = decodeURIComponent(username);

  return {
    title: `유저 정보 설정 페이지 | 영화를 봅시다`,
    description: `${decodedUsername}님의 유저 정보를 수정할 수 있는 페이지입니다.`
  };
};

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: signedInUserData, error } = await supabase.auth.getUser();

  // 로그인하지 않은 사용자면 내 정보로 돌려보내기
  if (error) {
    return redirect(`${process.env.BASE_URL}/user-page/${params.username}/info`);
  }

  // 로그인을 한 유저면 쿠키에서 정보를 받아서 username 비교하기
  const signedUserId = signedInUserData.user!.id;

  const decodedParamUsername = decodeURIComponent(params.username);
  const { data: usernameData } = await supabase.from('users').select('username').eq('id', signedUserId).single();
  const dbUsername = usernameData!.username;

  // 주소창에서 추출한 username과 현재 로그인한 유저의 username이 같지 않으면 내 정보로 돌려버리기
  if (decodedParamUsername !== dbUsername) {
    return redirect(`${process.env.BASE_URL}/user-page/${params.username}/info`);
  }

  return <>{children}</>;
}
