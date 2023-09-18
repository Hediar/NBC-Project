const DiscussionTopicSuspense = () => {
  return (
    <div className="mt-[50px] w-full">
      <h3 className="h3_suit flex">이 영화 토픽</h3>
      <div className="flex flex-col justify-between">
        <header className="w-full h-[60px] mt-10 rounded-[20px] bg-slate-100 flex gap-3 items-center px-6">
          <div>
            <div className="rounded-full w-[40px] h-[40px] bg-slate-200" />
          </div>
          <span className="subtitle2_suit"></span>
        </header>

        <section className="min-h-[438px] p-3 xl:px-[62px] sm:py-[54px] flex flex-col items-center relative mt-5 border border-[#888888] rounded-[40px]">
          <div className="flex flex-col flex-wrap justify-center items-center flex-1 w-full gap-[10px] py-5 leading-snug">
            <p className="w-4/5 h-[20px] bg-slate-200 rounded-lg"></p>
            <p className="body1_regular_suit text-[#888888] whitespace-normal break-all"></p>
          </div>

          <div className="h-[272px] w-4/5 flex items-center bg-slate-200 rounded-lg">{/* 선택지칸 */}</div>
        </section>

        <div className="mb-10"></div>

        <div className="border-b"></div>

        <div className="body1_bold_suit flex gap-5 my-10">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default DiscussionTopicSuspense;
