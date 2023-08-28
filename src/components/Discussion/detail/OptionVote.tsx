'use client';
import useDiscussionOptionQuery from '@/hooks/useDiscussionOptionQuery';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import React, { useEffect, useState } from 'react';

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
  const [isVoted, setIsVoted] = useState<boolean>(false);

  let sumCount = 0;
  optionData?.forEach((option) => (sumCount += option.count));

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData } = await supabase.from('discussion_user').select('*').eq('post_id', postId);
      const check = userData?.filter((data) => data.user_id === userId).length ? true : false;

      setIsVoted(check);
    };

    fetchUserData();
  }, [optionData]);

  const handleVoteCount = () => {
    if (!selectedOption || !userId) return;

    updateVoteMutation.mutate({ selectedOption, userId, postId });

    setSelectedOption(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5 w-3/5 max-h-[500px] overflow-y-auto">
      {optionData?.map((option, idx) => {
        return (
          <div key={idx} className="w-full h-[4rem] flex items-center" onClick={() => setSelectedOption(option)}>
            <span className="p-2 w-1/5">{optionMark[idx]}</span>
            <span className="p-2 w-3/5">
              {selectedOption?.option_id === option.option_id ? option.content + '체크' : option.content}
            </span>
            {isVoted && (
              <div className="p-2 w-1/5">
                <div className="w-full h-2">
                  <div className={`h-full bg-black`} style={{ width: `${(option.count / sumCount) * 100}%` }}></div>
                </div>
                <div className="flex gap-3">
                  <p>투표수: {option.count}</p>
                  <p>{((option.count / sumCount) * 100).toFixed(2) + '%'}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {optionData?.length ? (
        <div className="flex justify-between p-2">
          <span>총투표수: {sumCount}</span>
          <button className="pr-10" onClick={handleVoteCount}>
            {isVoted ? '재투표하기' : '투표하기'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OptionVote;
