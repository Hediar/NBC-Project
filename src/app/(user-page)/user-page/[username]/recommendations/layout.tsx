interface Params {
  params: {
    username: string;
  };
}

export const generateMetadata = ({ params: { username } }: Params) => {
  const decodedUsername = decodeURIComponent(username);

  return {
    title: `${decodedUsername}의 좋아요 추천 페이지 | 영화를 봅시다`,
    description: `${decodedUsername}님을 위한 추천 영화 페이지입니다.`
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-[calc(100vh-134px)] w-full bg-gray-100 overflow-scroll">{children}</div>;
}
