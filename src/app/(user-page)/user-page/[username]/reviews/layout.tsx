interface Params {
  params: {
    username: string;
  };
}

export const generateMetadata = ({ params: { username } }: Params) => {
  const decodedUsername = decodeURIComponent(username);

  return {
    title: `${decodedUsername}의 리뷰 페이지 | 영화를 봅시다`,
    description: `${decodedUsername}님이 작성하신 리뷰 페이지입니다.`
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1280px] p-5">{children}</div>;
}
