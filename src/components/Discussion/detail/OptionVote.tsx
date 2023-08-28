'use client';
import useDiscussionOptionQuery from '@/hooks/useDiscussionOptionQuery';
import useUserInfoStore from '@/store/saveCurrentUserData';
import React, { useState } from 'react';

interface Props {
  postId: number;
}

const OptionVote = ({ postId }: Props) => {
  const optionMark = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const [selectedOption, setSelectedOption] = useState<DiscussionOption | null>();
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const { isLoading, data: optionData, updateVoteMutation } = useDiscussionOptionQuery(postId);
  const handleVoteCount = () => {
    if (!selectedOption || !userId) return;

    updateVoteMutation.mutate(selectedOption);

    setSelectedOption(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5 w-3/5 max-h-[500px] overflow-y-auto">
      {optionData!.map((option, idx) => {
        return (
          <div
            key={idx}
            className="w-full h-[4rem] flex justify-between items-center"
            onClick={() => setSelectedOption(option)}
          >
            <span className="p-2">{optionMark[idx]}</span>
            <span className="w-3/5">
              {selectedOption?.option_id === option.option_id ? option.content + '체크' : option.content}
            </span>

            <div>
              <p>퍼센트막대게이지</p>
              <div>
                <p>{option.count}</p>
                <p>퍼센트%</p>
              </div>
            </div>
          </div>
        );
      })}
      <button onClick={handleVoteCount}>투표하기</button>
    </div>
  );
};

export default OptionVote;
