'use client';
import { message } from 'antd';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Prohibit from '@/styles/svg/Prohibit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddIgnoreMovieButton = (props: { movieid: number }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [messageApi, contextHolder] = message.useMessage();
  const { userInfo } = useUserInfoStore();
  const [isBtnNameShow, setIsBtnNameShow] = useState<boolean>(false);
  const addIgnoreMovie = async () => {
    const { data: ignoreTable, error } = await supabase.from('ignored_movies').select('*').eq('userid', userInfo.id);

    if (ignoreTable?.length) {
      const newignoreList = [...ignoreTable[0].ignored_movies, props.movieid.toString()];

      await supabase.from('ignored_movies').update({ ignored_movies: newignoreList }).eq('userid', userInfo.id);
    } else {
      const newignoreList: MovieIgnoredTable = { userid: userInfo.id!, ignored_movies: [props.movieid.toString()] }; // type 확인 필요
      await supabase.from('ignored_movies').insert(newignoreList);
    }
    messageApi.open({
      type: 'success',
      content: '무시 목록에 추가됐습니다. 추천 목록에서 제외됩니다.'
    });
  };

  const ignoreButtonHandler = async () => {
    if (userInfo.id) {
      await addIgnoreMovie();
    } else {
      messageApi.open({
        type: 'error',
        content: '로그인 해주세요!'
      });
    }
  };

  //   const ignoreMovie = async () => {
  //     const data = await fetch('/movies/ignore-movie', { method: 'POST', body: JSON.stringify({ movieId, path }) });
  //     const { isError, message } = await data.json();

  //     if (isError && message.includes('no user')) {
  //       return router.replace(`?sign-in=true&scrollTo=${movieId}`);
  //     } else if (isError && message.includes('이미')) {
  //       messageApi.open({
  //         type: 'error',
  //         content: message
  //       });
  //       return;
  //     } else if (isError) {
  //       messageApi.open({
  //         type: 'error',
  //         content: '오류가 발생했습니다. 다시 시도해주세요.'
  //       });
  //       return;
  //     }
  //     messageApi.open({
  //       type: 'success',
  //       content: '무시 목록에 추가됐습니다. 추천 목록에서 제외됩니다.'
  //     });
  //     // router.refresh();
  //   };
  //   ignoreMovie();
  //   //
  // };

  return (
    <>
      {contextHolder}
      <div
        onMouseEnter={() => {
          setIsBtnNameShow(true);
        }}
        onMouseLeave={() => setIsBtnNameShow(false)}
        className="relative"
      >
        <button
          className="w-full mb-[10px] bg-transparent sm:bg-white sm:opacity-30 hover:opacity-100 font-bold py-2 px-4 rounded-xl"
          onClick={ignoreButtonHandler}
        >
          추천 무시하기 😕
        </button>
        {/* {isBtnNameShow && <p className="absolute top-0 -left-5">무시하기</p>} */}
      </div>
    </>
  );
};

export default AddIgnoreMovieButton;
