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
    <div className="p-10 pb-5 bg-neutral-50 rounded-2xl border border-gray-200">
      <strong className='subtitle2_suit'>나의 영화 리스트</strong>
      <ul className="overflow-hidden relative mt-4 h-[338px]">
        <li className='inline-block'>
          <input
            className="peer sr-only"
            type="radio"
            value="myList-likes"
            name="myList"
            id="myList-likes"
            defaultChecked
          />
          <label
            className="inline-block mr-3 px-4 py-2 bg-white rounded-3xl border border-zinc-300 text-neutral-800 text-base font-normal leading-snug cursor-pointer peer-checked:bg-neutral-800 peer-checked:text-white transition-all duration-500 ease-in-out"
            htmlFor="myList-likes"
          >
            좋아요 누른 영화
          </label>
          <MyMoviesSwiper
            dataList={likesList}
            spaceBetween={20}
            slidesPerView={6}
            className="absolute left-0 w-full mt-3 mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1"
          />
        </li>

        <li className='inline-block'>
          <input className="peer sr-only" type="radio" value="myList-watchLater" name="myList" id="myList-watchLater" />
          <label
            className="inline-block mr-3 px-4 py-2 bg-white rounded-3xl border border-zinc-300 text-neutral-800 text-base font-normal leading-snug cursor-pointer peer-checked:bg-neutral-800 peer-checked:text-white transition-all duration-500 ease-in-out"
            htmlFor="myList-watchLater"
          >
            찜한 영화
          </label>
          <MyMoviesSwiper
            dataList={watchLaterList}
            spaceBetween={20}
            slidesPerView={6}
            className="absolute left-0 w-full mt-3 mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1"
          />
        </li>
      </ul>
    </div>
  );
};

export default MyMovies;
