'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AlreadyWatchedButton = ({ movieId, title }: { movieId: number; title: string }) => {
  const { userInfo } = useUserInfoStore();
  const [isUser, setIsUser] = useState<boolean>(false);
  const router = useRouter();
  const [api, context] = message.useMessage();

  useEffect(() => {
    !userInfo.id ? setIsUser(false) : setIsUser(true);
  }, [userInfo]);

  const WatchedButtonHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isUser) return router.replace('?sign-in=true');

    const supabase = createClientComponentClient<Database>();
    const { data } = await supabase.from('users').select('watched_movies').eq('id', userInfo.id).single();

    if (data?.watched_movies.some((el) => el === String(movieId))) {
      return api.open({ content: '이미 목록에 추가되었습니다.', type: 'warning' });
    }

    data!.watched_movies.push(String(movieId));

    const { error } = await supabase
      .from('users')
      .update({ watched_movies: data?.watched_movies })
      .eq('id', userInfo.id);
    if (error) {
      console.log(error);
    } else {
      api.open({ content: '이미 본 영화 목록에 추가되었습니다.', type: 'success' });
    }
  };
  return (
    <>
      {context}
      <button
        className="already-watched-button w-full bg-transparent sm:bg-white sm:opacity-30 hover:opacity-100 font-bold py-2 px-4 rounded-xl"
        onClick={WatchedButtonHandler}
      >
        이미 봤어요 🤓
      </button>
    </>
  );
};

export default AlreadyWatchedButton;
