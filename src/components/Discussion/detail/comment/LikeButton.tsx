'use client';

import useToggleSignInModal from '@/store/toggleSignInModal';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { throttle } from 'lodash';
import React from 'react';

type Props = {
  comment: {
    content: string;
    created_at: string;
    id: string;
    post_id: number;
    profiles: {
      username: string;
      avatar_url: string;
    };
    user_id: string;
    discussion_comments_likes: {
      comments_id: string;
      created_at: string;
      id: number;
      user_id: string;
    };
    user_has_liked_comment: boolean;
    likes: number;
  };
  addOptimisticComments: (action: any) => void;
};

const LikeButton = ({ comment, addOptimisticComments }: Props) => {
  const router = useRouter();
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();

  const handleLikes = throttle(async () => {
    await handleLike();
  }, 1000);

  const handleLike = async () => {
    const supabase = createClientComponentClient<Database>();

    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) {
      if (comment.user_has_liked_comment) {
        addOptimisticComments({
          ...comment,
          likes: comment.likes - 1,
          user_has_liked_comment: !comment.user_has_liked_comment
        });
        await supabase.from('discussion_comments_likes').delete().match({ user_id: user.id, comments_id: comment.id });
        router.refresh();
      } else {
        addOptimisticComments({
          ...comment,
          likes: comment.likes + 1,
          user_has_liked_comment: !comment.user_has_liked_comment
        });
        await supabase.from('discussion_comments_likes').insert({ user_id: user.id, comments_id: comment.id });
        router.refresh();
      }
    } else {
      alert('로그인을 해주세요.');
      setIsSignInModalOpen(true);
    }
  };

  return (
    <button onClick={handleLikes} className="text-xl">
      🩷
    </button>
  );
};

export default LikeButton;
