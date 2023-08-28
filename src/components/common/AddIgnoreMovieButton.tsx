'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const AddIgnoreMovieButton = (props: { movieid: number }) => {
  const supabase = createClientComponentClient<Database>();
  const { userInfo } = useUserInfoStore();
  const addIgnoreMovie = async () => {
    const { data: ignoreTable, error } = await supabase.from('ignored_movies').select('*').eq('userid', userInfo.id);

    if (ignoreTable?.length) {
      const newignoreList = [...ignoreTable[0].ignored_movies, props.movieid.toString()];
      console.log(newignoreList, userInfo.id);
      await supabase.from('ignored_movies').update({ ignored_movies: newignoreList }).eq('userid', userInfo.id);
    } else {
      const newignoreList = { userid: userInfo.id, ignored_movies: [props.movieid.toString()] };
      await supabase.from('ignored_movies').insert(newignoreList);
    }
    alert('무시 db확인');
  };

  const ignoreButtonHandler = async () => {
    if (userInfo.id) {
      await addIgnoreMovie();
    } else {
      alert('로그인 해주세요!');
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={ignoreButtonHandler}
      >
        추천x
      </button>
    </div>
  );
};

export default AddIgnoreMovieButton;
