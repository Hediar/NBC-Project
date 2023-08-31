'use client';

import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import { useEffect, useState } from 'react';
import MyMoviesSwiper from './MyMoviesSwiper';

const MyMovies = () => {
  const { userInfo } = useUserInfoStore();

  const [likesList, setLikesList] = useState<any>([]);
  const [watchLaterList, setWatchLaterList] = useState<any>([]);

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
      <ul className="mx-auto grid max-w-full w-full grid-cols-2 gap-x-5 px-8 h-[300px]">
        <li>
          <input className="peer sr-only" type="radio" value="myList-likes" name="myList" id="myList-likes" checked />
          <label
            className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out"
            htmlFor="myList-likes"
          >
            좋아요 누른 콘텐츠
          </label>
          <MyMoviesSwiper
            dataList={likesList}
            spaceBetween={20}
            slidesPerView={6}
            className="absolute bg-white shadow-lg left-0 p-6 border mt-2 border-indigo-300 rounded-lg w-full mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1"
          />
        </li>

        <li>
          <input className="peer sr-only" type="radio" value="myList-watchLater" name="myList" id="myList-watchLater" />
          <label
            className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out"
            htmlFor="myList-watchLater"
          >
            찜한 콘텐츠
          </label>
          <MyMoviesSwiper
            dataList={watchLaterList}
            spaceBetween={20}
            slidesPerView={6}
            className="absolute bg-white shadow-lg left-0 p-6 border mt-2 border-indigo-300 rounded-lg w-full mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1"
          />
        </li>
      </ul>
    </div>
  );
};

export default MyMovies;
