'use client';
import { getDiscussionPostDetail, getDiscussionPostOption } from '@/api/supabase-discussion';
import useDiscussionPostQuery from '@/hooks/useDiscussionPostQuery';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  params: {
    discussionId: string;
  };
}

const DiscussionEditPage = ({ params }: Props) => {
  const { discussionId } = params;
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [optionContent, setOptionContent] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const optionInputRef = useRef<HTMLInputElement>(null);
  const [optionValueCheck, setOptionValueCheck] = useState<boolean>(false);
  const initOptionLengthRef = useRef<number>(0);
  const { updatePostMutation } = useDiscussionPostQuery();

  useEffect(() => {
    const getInitData = async () => {
      const initPostData = await getDiscussionPostDetail(+discussionId);
      setTitle(initPostData!.title);
      setContent(initPostData!.content);

      const initOptionData = await getDiscussionPostOption(+discussionId);
      const initOptions = initOptionData?.map((option) => option.content);
      setOptions([...initOptions!]);
      initOptionLengthRef.current = initOptions!.length;
    };
    getInitData();
  }, []);

  const router = useRouter();

  const addOption = () => {
    if (optionContent) {
      const newOption = optionContent;
      setOptions([...options, newOption]);
      setOptionContent('');
    } else {
      if (optionInputRef.current instanceof HTMLInputElement) optionInputRef.current.focus();
      setOptionValueCheck(true);
    }
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
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <label htmlFor="topic">주제</label>
          <input type="text" name="topic" className="border" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <label htmlFor="explanation">설명</label>
          <input
            type="text"
            name="explanation"
            className="border"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="m-5">
          {options.map((option, idx) => {
            return (
              <div key={idx} className="flex gap-2">
                {idx < initOptionLengthRef.current ? (
                  <>
                    <p className="text-gray-500">{option}</p>
                  </>
                ) : (
                  <>
                    <p>{option}</p>
                    <div onClick={() => deleteOption(idx)}>삭제</div>
                  </>
                )}
              </div>
            );
          })}
          <input
            ref={optionInputRef}
            type="text"
            placeholder="선택지를 추가하세요"
            name="addOption"
            value={optionContent}
            onChange={(e) => setOptionContent(e.target.value)}
            onClick={() => setOptionValueCheck(false)}
          ></input>
          {optionValueCheck && <p className="absolute z-10 text-xs text-red-300">내용을 입력해주세요</p>}

          <button onClick={addOption}>+</button>
        </div>
      </form>
      <button onClick={handleSubmit}>작성</button>
    </div>
  );
};

export default DiscussionEditPage;
