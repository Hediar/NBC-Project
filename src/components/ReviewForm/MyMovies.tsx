'use client';

import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import { useEffect, useState } from 'react';
import MyMoviesSwiper from './MyMoviesSwiper';

type Props = {};

const MyMovies = (props: Props) => {
  const { userInfo } = useUserInfoStore();

  const [likesList, setLikesList] = useState<any>([]);
  const [watchLaterList, setWatchLaterList] = useState<any>([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const getLikesList = async () => {
      const { data: userLikedMoviesGroup, error } = await supabase
        .from('movielikes')
        .select('movieid')
        .contains('user_id', [userInfo.id]);

      const usersLikedMovies = userLikedMoviesGroup?.map((el) => el.movieid);
      const movieDetails = await getMovieDataWithMovieIds(usersLikedMovies!);

      setLikesList([...movieDetails]);
    };
    const getWatchLaterList = async () => {
      const { data: watchLaterMovies, error } = await supabase
        .from('watch_later')
        .select('movies')
        .eq('userid', userInfo.id);

      const movieList: [string] = watchLaterMovies![0].movies;
      const movieDetails = await getMovieDataWithMovieIds(movieList);
      setWatchLaterList([...movieDetails]);
    };

    if (userInfo.id) {
      getLikesList();
      getWatchLaterList();
    }
  }, [userInfo]);

  return (
    <div>
      <strong>나의 영화 리스트</strong>
      <ul>
        <li>
          <button
            onClick={() => {
              setTab(0);
            }}
          >
            좋아요 누른 콘텐츠
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setTab(1);
            }}
          >
            찜한 콘텐츠
          </button>
        </li>
      </ul>
      <div className="overflow-auto h-96">
        {
          [
            <MyMoviesSwiper dataList={likesList} spaceBetween={20} slidesPerView={4} />,
            <MyMoviesSwiper dataList={watchLaterList} spaceBetween={20} slidesPerView={4} />
          ][tab]
        }
      </div>
    </div>
  );
};

export default MyMovies;
