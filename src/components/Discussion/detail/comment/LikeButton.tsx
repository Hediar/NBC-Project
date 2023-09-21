'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import throttle from 'lodash/throttle';
import { useState } from 'react';
import { HeartFilledColor, HeartLine } from '@/styles/icons/Icons24';

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
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(comment.user_has_liked_comment);

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
        setIsLiked((prevState) => !prevState);
        router.refresh();
      } else {
        addOptimisticComments({
          ...comment,
          likes: comment.likes + 1,
          user_has_liked_comment: !comment.user_has_liked_comment
        });
        await supabase.from('discussion_comments_likes').insert({ user_id: user.id, comments_id: comment.id });
        setIsLiked((prevState) => !prevState);
        router.refresh();
      }
    } else {
      alert('로그인을 해주세요.');
      router.replace('?sign-in=true');
    }
  };

  return (
    <>
      {isHover || isLiked ? (
        <HeartFilledColor
          className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleLikes}
        />
      ) : (
        <HeartLine className="w-7 h-7 sm:w-8 sm:h-8" onMouseEnter={() => setIsHover(true)} onClick={handleLikes} />
      )}
    </>
  );
};

export default LikeButton;
