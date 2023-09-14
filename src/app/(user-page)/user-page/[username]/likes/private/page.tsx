interface Props {
  params: {
    username: string;
  };
}

const PrivatePage = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);

  return (
    <div className="w-full bg-white pb-10">
      <div className="w-full bg-white pb-10">
        <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)] gap-16">
          <h2 className="text-center font-bold text-2xl">{username}님이 좋아하신 영화</h2>
          <p className="text-2xl ">{username}님의 좋아하신 영화 목록이 비공개 상태입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
