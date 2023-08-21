'use client';
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/config';

/**영화id props로 내려받아서, 해당 영화 id가 존재할 때
 * 현재 유저의 좋아요가 있는지 확인하고 -> 현재 user는 zustand로 관리
 * 있으면 하트, 없으면 빈하트(디자인에 맞춰서) -> useState로 관리
 * 좋아요 userid의 배열에 따라 개수 count
 *
 */

const MovieLikes = (props: any) => {
  const [likeusercnt, setLikeusercnt] = useState(0); // 영화를 좋아하는 유저 수
  const [likecurrentuser, setLikecurrentuser] = useState(false); // 현재 유저가 좋아하는지 여부

  const currentLikeUserStateCheck = async () => {
    const { data: currentMovieLikeData } = await supabase.from('movielikes').select('*').eq('movieid', props.movieid);
    if (currentMovieLikeData?.length !== 0) {
      const likeusers = currentMovieLikeData![0].userid.length;
      setLikeusercnt(likeusers);
      // console.log(currentMovieLikeData);
    }
  };

  const movielikeHandler = () => {
    let inputData = {};
  };

  useEffect(() => {
    currentLikeUserStateCheck();
  }, []);

  return (
    <div>
      MovieLikes
      <br />
      {props.movieid}
      좋아요 개수: {likeusercnt}
      <br />
      <button>좋아요</button>
    </div>
  );
};

export default MovieLikes;
