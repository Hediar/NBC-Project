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

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
