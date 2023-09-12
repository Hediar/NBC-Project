'use client';

interface Props {
  open?: boolean;
  onLeave?: () => void;
  onContinue?: () => void;
}

const LeaveConfirmModal = ({ open, onLeave, onContinue }: Props) => {
  if (open)
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p>작성중인 내용이 있을 수 있습니다. 정말 나가시겠습니까?</p>
          <p className="text-gray-300 text-sm">작성중인 모든 내용은 사라집니다.</p>
        </div>

        <div className="flex space-x-4 w-full justify-center">
          <div>
            <button onClick={onLeave} className="bg-gray-100 px-10 py-3 rounded-md">
              나가기
            </button>
          </div>
          <div>
            <button onClick={onContinue} className="bg-white border text-black px-10 py-3 rounded-md">
              계속 작성하기
            </button>
          </div>
        </div>
      </div>
    );
};

export default LeaveConfirmModal;
