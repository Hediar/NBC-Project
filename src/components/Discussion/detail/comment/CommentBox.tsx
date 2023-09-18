import Image from 'next/image';
import React, { useRef, useState } from 'react';
import LikeButton from './LikeButton';
import DeleteCommentButton from './DeleteComment';
import changeFormat from '@/api/formatTime';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

interface Props {
  signedInUserId: string;
  comment: DiscussionCommentsData;
  addOptimisticComments: (action: any) => void;
}

const CommentBox = ({ comment, signedInUserId, addOptimisticComments }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editInputValue, setEditInputValue] = useState<string>(comment.content);
  const editInputRef = useRef<HTMLInputElement>(null);

  const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editInputValue === '') {
      messageApi.open({ type: 'warning', content: '내용을 입력해주세요' });
      return;
    }
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('discussion_comments')
      .update({ content: editInputValue })
      .eq('id', comment.id);
    if (error) {
      messageApi.open({ type: 'warning', content: '에러가 발생했습니다. 다시 시도해주세요.' });
    } else {
      messageApi.open({ type: 'success', content: '수정되었습니다.' });

      router.refresh();
      setIsEdit(false);
    }
  };

  const handleCancleBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsEdit(false);
    setEditInputValue(comment.content);
  };

  return (
    <>
      {contextHolder}
      <div
        key={comment.id}
        className="flex flex-col gap-3 w-full min-h-[142px] text-sm mb-2 p-5 border rounded-[20px] bg-[#EBEBEB]"
      >
        <div className="w-full flex items-center gap-3">
          <div>
            <Image
              className="h-8 w-8 rounded-full"
              width={40}
              height={40}
              alt="user-profile"
              src={comment.profiles!.avatar_url}
            />
          </div>
          <h6 className="subtitle2_suit">{comment.profiles!.username}</h6>
        </div>

        <div className="w-11/12 flex flex-col gap-1">
          <div className="flex items-center gap-4">
            {isEdit ? (
              <div className="w-full custom_input relative" onClick={() => editInputRef.current?.focus()}>
                <form onSubmit={editHandler}>
                  <input
                    ref={editInputRef}
                    type="text"
                    autoFocus
                    className="w-11/12 border-none outline-none"
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                  />
                  <div className="absolute top-5 right-2 flex gap-2 text-xs">
                    <button className="text-gray-400">완료</button>
                    <button className="text-gray-400" onClick={handleCancleBtn}>
                      취소
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <p className="body1_regular_suit whitespace-normal break-all">{comment.content}</p>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <span>좋아요 {comment.likes}개</span>
            {/* <button>답글</button> */}
            <span>{changeFormat(comment.created_at)}</span>
            <LikeButton comment={comment} addOptimisticComments={addOptimisticComments} />
            {signedInUserId === comment.user_id && <button onClick={() => setIsEdit(!isEdit)}>수정</button>}
            {signedInUserId === comment.user_id && <DeleteCommentButton postId={comment.id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
