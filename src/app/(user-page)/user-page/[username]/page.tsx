import { redirect } from 'next/navigation';

interface Props {
  params: {
    username: string;
  };
}

// 사용자가 baseURL/user-page/[username] 으로만 접근하면
// baseURL/user-page/[username]/info로 보내기

const RedirectToUserPageOrHome = async ({ params }: Props) => {
  const encodedUsername = params.username;

  return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/user-page/${encodedUsername}/info`);
};

export default RedirectToUserPageOrHome;
