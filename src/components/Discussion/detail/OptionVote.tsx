'use client';
import useDiscussionOptionQuery from '@/hooks/useDiscussionOptionQuery';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import React, { useEffect, useState } from 'react';

interface Props {
  postId: number;
  voteCount: number;
}

const OptionVote = ({ postId, voteCount }: Props) => {
  const optionMark = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const [selectedOption, setSelectedOption] = useState<DiscussionOption | null>();
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const { isLoading, data: optionData, addVoteMutation, revoteMutation } = useDiscussionOptionQuery(postId);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [votedOption, setVotedOption] = useState<DiscussionUser>();
  let sumCount = voteCount;
  // optionData?.forEach((option) => (sumCount += option.count));

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData } = await supabase.from('discussion_user').select('*').eq('post_id', postId);
      const votedOption = userData?.filter((data) => data.user_id === userId);
      const check = votedOption?.length ? true : false;

      if (votedOption) {
        setIsVoted(check);
        setVotedOption(votedOption[0]);
      }
    };

    fetchUserData();
  }, [optionData]);

  const handleVoteCount = async () => {
    if (!selectedOption || !userId) return;
    const userData = {
      user_id: userId,
      option_id: selectedOption.option_id,
      post_id: postId
    };
    addVoteMutation.mutate(userData);

    await supabase
      .from('discussion_post')
      .update({ vote_count: sumCount + 1 })
      .eq('post_id', userData.post_id)
      .select();
    setSelectedOption(null);
  };

  const handleRevoteCount = () => {
    if (!selectedOption || !userId) return;
    const userData = {
      user_id: userId,
      option_id: selectedOption.option_id,
      post_id: postId
    };
    revoteMutation.mutate({ optionId: votedOption!.option_id, userId, userData });

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
            <span className="p-2 w-1/5">
              {votedOption?.option_id === option.option_id ? optionMark[idx] + '투표됨' : optionMark[idx]}
            </span>
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
          {isVoted ? (
            <button className="pr-10" onClick={handleRevoteCount}>
              재투표하기
            </button>
          ) : (
            <button className="pr-10" onClick={handleVoteCount}>
              투표하기
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default OptionVote;
