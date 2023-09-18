const DiscussionCommentContainerSuspense = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex gap-2 items-center">
        <CommentInput />
      </div>

      <DisplayComments />
    </div>
  );
};

export default DiscussionCommentContainerSuspense;

const CommentInput = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="w-full border rounded-xl flex px-[20px] py-[12px] justify-between">
        <textarea className="w-5/6 h-[92px] border-none resize-none focus:outline-none text-base" />
        <div className="self-end"></div>
        <div className="self-end">
          <button className="primary_small_default_noIcon"></button>
        </div>
      </div>
    </div>
  );
};

const DisplayComments = () => {
  const displayComments = [0, 1, 2].map((comment, idx) => {
    return (
      <div
        key={idx}
        className="flex flex-col gap-3 w-full min-h-[142px] text-sm mb-2 p-5 border rounded-[20px] bg-slate-100"
      >
        <div className="w-full flex items-center gap-3">
          <div>
            <div className="h-8 w-8 rounded-full bg-slate-200" />
          </div>
          <div className="h-[24px] w-full bg-slate-200"></div>
        </div>

        <div className="w-11/12 flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <p className="body1_regular_suit whitespace-normal break-all"></p>
          </div>
          <div className="flex gap-2 w-full h-[24px] items-center bg-slate-200">
            <span></span>
            {/* <button>답글</button> */}
            <span></span>
          </div>
        </div>
      </div>
    );
  });

  return <div>{displayComments}</div>;
};
