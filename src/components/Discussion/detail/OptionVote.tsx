'use client';

import useDiscussionOptionQuery from '@/hooks/useDiscussionOptionQuery';
import { optionMark } from '@/static/optionMark';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

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

  const { isLoading, data: optionData, addVoteMutation, revoteMutation } = useDiscussionOptionQuery(postId);

  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [votedOption, setVotedOption] = useState<DiscussionUser>();
  const [sumCount, setSumCount] = useState<number>(voteCount);
  const router = useRouter();

  console.log('렌더안됨=>', checkUpdate);
  useEffect(() => {
    console.log('렌더됨=>', checkUpdate);
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
      <div className="m-5 w-3/5 max-h-[15rem] overflow-y-auto flex flex-col gap-3">
        {optionData?.map((option, idx) => {
          return (
            <React.Fragment key={idx}>
              {selectedOption?.option_id === option.option_id ? (
                <div
                  className="w-full h-[4rem] flex gap-5 items-center rounded-xl py-10 px-5 relative overflow-hidden"
                  style={{
                    border: `${
                      votedOption?.option_id === option.option_id || selectedOption?.option_id === option.option_id
                        ? '1px solid black'
                        : 'none'
                    }`
                  }}
                  onClick={() => setSelectedOption(option)}
                >
                  <div
                    className="w-8 h-8 p-2 bg-gray-400 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${votedOption?.option_id === option.option_id ? 'black' : 'rgba(88,88,88,0.5)'}`
                    }}
                  >
                    <span className="font-bold text-white">{optionMark[idx]}</span>
                  </div>
                  <div className="w-3/5 overflow-auto">
                    <p>{option.content}</p>
                  </div>

                  {isVoted && (
                    <>
                      <div className="w-full h-full absolute top-0 left-0 -z-10">
                        <div
                          className={`h-full bg-gray-200`}
                          style={{ width: `${(option.count / sumCount) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <span className="font-bold">{voteCount}명</span>
                        <span className="font-bold text-gray-400">{`${(option.count / sumCount) * 100}%`}</span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div
                  className="w-full h-[4rem] flex gap-5 items-center rounded-xl py-10 px-5 relative overflow-hidden"
                  style={{
                    border: `${
                      votedOption?.option_id === option.option_id ? '1px solid black' : '1px solid rgba(88,88,88,0.5)'
                    }`
                  }}
                  onClick={() => setSelectedOption(option)}
                >
                  <div
                    className="w-8 h-8 p-2 bg-gray-400 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${votedOption?.option_id === option.option_id ? 'black' : 'rgba(88,88,88,0.5)'}`
                    }}
                  >
                    <span className="font-bold text-white">{optionMark[idx]}</span>
                  </div>
                  <div className="w-3/5 overflow-auto">
                    <p>{option.content}</p>
                  </div>
                  {isVoted && (
                    <>
                      <div className="w-full h-full absolute top-0 left-0 -z-10">
                        <div
                          className={`h-full bg-gray-200`}
                          style={{ width: `${(option.count / sumCount) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <span className="font-bold">{voteCount}명</span>
                        <span className="font-bold text-gray-400">{`${(option.count / sumCount) * 100}%`}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </React.Fragment>
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
    </>
  );
};

export default OptionVote;
