import React from 'react';

type Props = {
  isManualOpen: boolean;
  handleManual: React.Dispatch<React.SetStateAction<boolean>>;
  isOptionOpen: boolean;
  handleOptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DiscussionStyleBox = ({ handleManual, isManualOpen, isOptionOpen, handleOptionOpen }: Props) => {
  return (
    <>
      <p className="font-bold relative">
        <span
          onMouseOver={() => {
            handleManual((prev) => !prev);
          }}
          onMouseLeave={() => {
            handleManual((prev) => !prev);
          }}
        >
          토론 방식*
        </span>
        {isManualOpen && <span className="text-sm text-red-300">토론방식은 추후 수정하실 수 없습니다</span>}
      </p>
      <div className="flex gap-3 mt-3">
        {isOptionOpen ? (
          <>
            <button
              className={`${Style.voteBtn}`}
              onClick={() => {
                handleOptionOpen(false);
              }}
            >
              자유 토론
            </button>
            <button
              className={`${Style.voteBtn} bg-black text-white`}
              onClick={() => {
                handleOptionOpen(true);
              }}
            >
              투표 토론
            </button>
          </>
        ) : (
          <>
            <button
              className={`${Style.voteBtn} bg-black text-white`}
              onClick={() => {
                handleOptionOpen(false);
              }}
            >
              자유 토론
            </button>
            <button
              className={`${Style.voteBtn}`}
              onClick={() => {
                handleOptionOpen(true);
              }}
            >
              투표 토론
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default DiscussionStyleBox;
const Style = {
  voteBtn: 'border px-6 sm:px-20 py-3 rounded-[22px]'
};
