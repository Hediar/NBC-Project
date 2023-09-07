'use client';
import { message } from 'antd';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Prohibit from '@/styles/svg/Prohibit';
import { useState } from 'react';

const AddIgnoreMovieButton = (props: { movieid: number }) => {
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={ignoreButtonHandler}
        >
          <Prohibit />
        </button>
        {/* {isBtnNameShow && <p className="absolute top-0 -left-5">무시하기</p>} */}
      </div>
    </>
  );
};

export default AddIgnoreMovieButton;
