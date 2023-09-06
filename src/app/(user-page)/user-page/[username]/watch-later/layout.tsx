interface Params {
  params: {
    username: string;
  };
}

export const generateMetadata = ({ params: { username } }: Params) => {
  const decodedUsername = decodeURIComponent(username);

  return {
    title: `${decodedUsername}님의 찜한 영화 페이지 | 영화를 봅시다`,
    description: `${decodedUsername}님이 찜하신 영화 목록 페이지입니다.`
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full bg-white pb-10">{children}</div>;
}
