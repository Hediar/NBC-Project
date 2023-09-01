'use client';
import { getDiscussionPostDetail, getDiscussionPostOption } from '@/api/supabase-discussion';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import useDiscussionPostQuery from '@/hooks/useDiscussionPostQuery';
import { optionMark } from '@/static/optionMark';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  params: {
    discussionId: string;
  };
}

interface Option {
  text: string;
}

const DiscussionEditPage = ({ params }: Props) => {
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

  useEffect(() => {
    const getInitData = async () => {
      const initPostData = await getDiscussionPostDetail(+discussionId);

      setTitle(initPostData!.title);
      setContent(initPostData!.content);
      setMovieId(initPostData.movie_id);

      const initOptionData = await getDiscussionPostOption(+discussionId);
      const initOptions = initOptionData?.map((option) => option.content);

      setOptions([...initOptions!.map((option) => ({ text: option }))]);
      initOptionLengthRef.current = initOptions!.length;
    };
    getInitData();
  }, []);

  const router = useRouter();

  const addOption = () => {
    const newOption = { text: '' };
    setOptions([...options, newOption]);
  };

  const deleteOption = (idx: number) => {
    setOptions(options.filter((_, index) => index !== idx));
  };

  const handleSubmit = async () => {
    if (!userId) return;
    try {
      updatePostMutation.mutate({
        userId,
        title,
        content,
        options,
        postId: discussionId,
        startNum: initOptionLengthRef.current
      });

      alert('토론글이 수정되었습니다');

      router.refresh();
      router.push(`/discussion/detail/${discussionId}`);
    } catch (error) {}
  };

  return (
    <div className="p-5 w-3/5">
      {/* S:: 영화 선택 */}
      <div>
        <ReviewMovie movieId={movieId as string} />
      </div>
      {/* E:: 영화 선택 */}

      <div className="flex flex-col gap-5 w-full mt-5">
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="topic">주제</label>
          <input
            type="text"
            name="topic"
            className="border p-2 rounded w-4/5"
            placeholder="내용을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="explanation">설명</label>
          <input
            type="text"
            name="explanation"
            className="border p-2 rounded w-4/5"
            placeholder="토론 주제를 설명해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="m-5">
        <>
          <p className="font-bold p-2">{'투표기능(선택지 최대 10개)'}</p>
          {options.map((option, idx) => {
            return (
              <div key={idx} className="flex gap-2 items-center">
                <div className="w-full">
                  <label htmlFor={`의견${optionMark[idx]}`}>의견{optionMark[idx]}</label>
                  {idx < initOptionLengthRef.current ? (
                    <input
                      name={`의견${optionMark[idx]}`}
                      className="border w-full p-1 my-2 rounded pointer-events-none"
                      type="text"
                      value={option.text}
                      placeholder="내용을 입력해주세요"
                    />
                  ) : (
                    <input
                      name={`의견${optionMark[idx]}`}
                      className="border w-full p-1 my-2 rounded"
                      type="text"
                      placeholder="내용을 입력해주세요"
                      onChange={(e) => {
                        option.text = e.target.value;
                      }}
                    />
                  )}

                  {idx > 1 && idx >= initOptionLengthRef.current && (
                    <button
                      className="float-right text-sm font-bold text-gray-500 border px-2 py-1 rounded-xl m-1"
                      onClick={() => deleteOption(idx)}
                    >
                      취소
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {options.length < 10 && (
            <div className="flex justify-center my-5">
              <button className="border px-2 py-1 hover:bg-gray-200 rounded" onClick={addOption}>
                <span>선택지 추가하기</span>
              </button>
            </div>
          )}
        </>
      </div>

      <div className="flex justify-center gap-3">
        <button className="border px-2 py-1 bg-gray-300 text-white font-bold hover:bg-gray-200 hover:text-gray-700 rounded">
          임시저장
        </button>
        <button
          className="border px-2 py-1 bg-black text-white font-bold hover:bg-gray-200 hover:text-gray-700 rounded"
          onClick={handleSubmit}
        >
          토론 게시하기
        </button>
      </div>
    </div>
  );
};

export default DiscussionEditPage;
