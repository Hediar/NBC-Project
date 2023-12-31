'use client';

import { getDiscussionPostDetail, getDiscussionPostOption } from '@/api/supabase-discussion';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import useDiscussionPostQuery from '@/hooks/useDiscussionPostQuery';
import { optionMark } from '@/static/optionMark';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import debounce from 'lodash/debounce';
import useLeaveConfirmation from '@/hooks/useLeaveConfiramation';

interface Props {
  params: {
    discussionId: string;
  };
}

const marginYGap = '25px';

const DiscussionEditPage = ({ params }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { discussionId } = params;
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();

  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [movieId, setMovieId] = useState<string>();
  const [options, setOptions] = useState<Option[]>([]);

  const initOptionLengthRef = useRef<number>(0);
  const { updatePostMutation } = useDiscussionPostQuery('DiscussionEditPage');
  const titleRef = useRef<HTMLInputElement>(null);
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);

  const router = useRouter();
  //url 변경 감지
  const { confirmationModal } = useLeaveConfirmation(true);

  //뒤로가기 방지
  useEffect(() => {
    const preventGoBack = () => {
      if (confirm('정말 나가시겠습니까? \n작성중인 내용이 모두 사라집니다.')) {
        history.go(-1);
      } else {
        history.pushState(null, '', location.href);
      }
    };
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);

  useEffect(() => {
    const getInitData = async () => {
      const initPostData = await getDiscussionPostDetail(+discussionId);

      setTitle(initPostData!.title);
      setContent(initPostData!.content);
      setMovieId(initPostData.movie_id);
      if (userId) {
        if (userId !== initPostData.user_id) {
          messageApi.open({
            type: 'error',
            content: '작성자와 현재유저가 다릅니다'
          });
          router.push('/');
        }
      }
      const initOptionData = await getDiscussionPostOption(+discussionId);
      const initOptions = initOptionData?.map((option) => option.content);

      setOptions([...initOptions!.map((option) => ({ text: option }))]);
      initOptionLengthRef.current = initOptions!.length;
    };
    getInitData();
  }, []);

  const addOption = () => {
    const newOption = { text: '' };
    setOptions([...options, newOption]);
  };

  const deleteOption = (idx: number) => {
    setOptions(options.filter((_, index) => index !== idx));
  };

  const handleCancel = () => router.back();

  const handleSubmit = async () => {
    if (!userId) {
      messageApi.open({
        type: 'warning',
        content: '로그인 해주세요'
      });
      router.replace('?sign-in=true');
    }
    if (!title) {
      messageApi.open({
        type: 'warning',
        content: '토론주제를 입력해주세요'
      });
      return titleRef.current!.focus();
    } else if (userId) {
      try {
        updatePostMutation.mutate({
          userId,
          title,
          content,
          options,
          postId: discussionId,
          startNum: initOptionLengthRef.current
        });

        messageApi.open({
          type: 'success',
          content: '토론글이 수정되었습니다'
        });

        router.refresh();
        router.push(`/discussion/detail/${discussionId}`);
      } catch (error) {}
    }
  };

  return (
    <>
      {contextHolder}
      {confirmationModal}
      <div className="sm:p-5 w-full sm:w-4/5 lg:w-3/5 mx-auto">
        <h1 className={`text-2xl font-bold mb-[25px]`}>토론 작성</h1>

        {movieId && (
          <div
            onClick={() => {
              messageApi.open({
                type: 'error',
                content: '변경하실 수 없습니다'
              });
            }}
            className="info-box"
          >
            <ReviewMovie movieId={movieId} />
          </div>
        )}

        <div className={`flex flex-col w-full mt-[${marginYGap}] font-bold`}>
          <div>
            <label htmlFor="topic">토론 주제*</label>
            <input
              ref={titleRef}
              type="text"
              name="topic"
              className="border w-full px-[20px] py-[12px] rounded-[10px] mt-[6px]"
              placeholder="내용을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={`mt-[${marginYGap}]`}>
            <label htmlFor="explanation">추가 설명</label>
            <input
              type="text"
              name="explanation"
              className="border w-full px-[20px] py-[12px] rounded-[10px] mt-[6px]"
              placeholder="토론 주제를 설명해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className={`mt-[${marginYGap}]`}>
          <p className="font-bold relative">
            <span
              onMouseOver={() => {
                setIsManualOpen(!isManualOpen);
              }}
              onMouseLeave={() => {
                setIsManualOpen(!isManualOpen);
              }}
            >
              토론 방식*
            </span>
            {isManualOpen && <span className="text-sm text-red-300">토론방식은 수정하실 수 없습니다</span>}
          </p>
          <div className="flex gap-3 mt-3 pointer-events-none">
            {initOptionLengthRef.current ? (
              <>
                <div className={`${Style.voteBtn}`}>자유 토론</div>
                <div className={`${Style.voteBtn} bg-black text-white`}>투표 토론</div>
              </>
            ) : (
              <>
                <div className={`${Style.voteBtn} bg-black text-white`}>자유 토론</div>
                <div className={`${Style.voteBtn}`}>투표 토론</div>
              </>
            )}
          </div>
        </div>

        {!!initOptionLengthRef.current && (
          <div className={`mt-[${marginYGap}] font-bold`}>
            {options.map((option, idx) => {
              return (
                <div key={idx} className="flex gap-2 items-center">
                  <div className="w-full">
                    <label htmlFor={`의견${optionMark[idx]}`}>의견{optionMark[idx]}</label>
                    {idx > 1 && idx >= initOptionLengthRef.current && (
                      <button className="rounded-full p-1 ml-1 bg-gray-200" onClick={() => deleteOption(idx)}></button>
                    )}
                    {idx < initOptionLengthRef.current ? (
                      <input
                        name={`의견${optionMark[idx]}`}
                        className="border w-full px-3 py-1.5 my-2 rounded-xl pointer-events-none"
                        type="text"
                        defaultValue={option.text}
                        placeholder="내용을 입력해주세요"
                      />
                    ) : (
                      <input
                        name={`의견${optionMark[idx]}`}
                        className="border w-full px-3 py-1.5 rounded-xl"
                        type="text"
                        placeholder="내용을 입력해주세요"
                        onChange={(e) => {
                          option.text = e.target.value;
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {options.length < 10 && (
              <div className="flex justify-center my-5">
                <button
                  className="w-full border px-2 py-1 bg-gray-200 hover:bg-gray-100 rounded-[10px]"
                  onClick={addOption}
                >
                  <span>+ 다른 의견 추가</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center gap-3 mt-[25px]">
          <button className="button-white" onClick={handleCancel}>
            돌아가기
          </button>
          <button className="button-dark" onClick={debounce(handleSubmit, 300)}>
            토론 수정하기
          </button>
        </div>
      </div>
    </>
  );
};

export default DiscussionEditPage;

const Style = {
  voteBtn: 'border px-6 sm:px-20 py-3 rounded-[22px]'
};
