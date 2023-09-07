'use client';

import useDiscussionOptionQuery from '@/hooks/useDiscussionOptionQuery';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import Option from './Option';

interface Props {
  postId: number;
  voteCount: number;
  checkUpdate: number;
}

const OptionVote = ({ postId, voteCount, checkUpdate }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedOption, setSelectedOption] = useState<DiscussionOption | null>();

  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const { isLoading, data: optionData, addVoteMutation, revoteMutation, refetch } = useDiscussionOptionQuery(postId);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [votedOption, setVotedOption] = useState<DiscussionUser>();
  const [sumCount, setSumCount] = useState<number>(voteCount);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData } = await supabase.from('discussion_user').select('*').eq('post_id', postId);
      const userOption = userData?.filter((data) => data.user_id === userId);
      const check = userOption?.length ? true : false;

      if (userOption) {
        setIsVoted(check);
        setVotedOption(userOption[0]);
      }
    };

    fetchUserData();
    refetch();
  }, [optionData, userId, checkUpdate]);

  const handleVoteCount = async () => {
    if (!selectedOption) {
      messageApi.open({ type: 'warning', content: '투표할 선택지를 선택해주세요' });
      return;
    }
    if (!userId) {
      messageApi.open({ type: 'warning', content: '로그인 해주세요' });
      return router.replace('?sign-in=true');
    }
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

    setSumCount((sumCount) => (sumCount += 1));
    setSelectedOption(null);
    router.refresh();
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
    <>
      {contextHolder}
      <div className="m-5 w-full px-20 py-3 max-h-[272px] overflow-y-auto flex flex-col gap-3">
        {optionData?.map((option, idx) => (
          <React.Fragment key={idx}>
            {selectedOption?.option_id === option.option_id ? (
              <Option
                option={option}
                selected={true}
                votedOption={votedOption}
                sumCount={sumCount}
                settingNum={idx}
                onClick={() => setSelectedOption(option)}
              />
            ) : (
              <Option
                option={option}
                selected={false}
                votedOption={votedOption}
                sumCount={sumCount}
                settingNum={idx}
                onClick={() => setSelectedOption(option)}
              />
            )}
          </React.Fragment>
        ))}
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
    </>
  );
};

export default OptionVote;
