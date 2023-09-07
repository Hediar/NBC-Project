'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { message } from 'antd';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

interface Props {
  signedInUserId: string;
  discussionId: string;
}

const CommentInput = ({ signedInUserId, discussionId }: Props) => {
  const [commentValue, setCommentValue] = useState<string>('');
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const writeCommentHandler = async () => {
    if (!commentValue) {
      messageApi.open({
        type: 'warning',
        content: '댓글을 입력해주세요.'
      });
      if (textareaRef.current) return textareaRef.current.focus();
      return;
    }
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('discussion_comments')
      .insert({ content: commentValue, user_id: signedInUserId, post_id: Number(discussionId) });

    if (error) {
      messageApi.open({
        type: 'error',
        content: '댓글 남기기 권한이 없습니다. 로그인을 해주세요.'
      });

      return router.replace('?sign-in=true');
    }
    messageApi.open({
      type: 'success',
      content: '등록되었습니다.'
    });
    setCommentValue('');
    router.refresh();
  };
  const handleFocusing = () => {
    if (textareaRef.current) textareaRef.current.focus();
  };
  if (commentValue.length > 300) setCommentValue(commentValue.slice(0, 300));
  return (
    <>
      {contextHolder}

      <div className="flex w-full gap-2">
        <div className="w-full border rounded-xl flex px-[20px] py-[12px] justify-between" onClick={handleFocusing}>
          <textarea
            ref={textareaRef}
            className="w-5/6 h-[92px] border-none resize-none focus:outline-none text-base"
            placeholder={`${signedInUserId ? '내용을 입력해주세요' : '로그인 해주세요'}`}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <div className="self-end">{commentValue.length}/300</div>
          <div className="self-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                debounce(() => writeCommentHandler(), 200)();
              }}
              className="primary_small_default_noIcon"
            >
              작성
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentInput;
