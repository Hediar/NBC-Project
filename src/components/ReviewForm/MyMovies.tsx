'use client';

import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useReviewMovieStore } from '@/store/useReviewStore';
import supabase from '@/supabase/config';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {};

const MyMovies = (props: Props) => {
  const { userInfo } = useUserInfoStore();
  const { saveSearchMovieId } = useReviewMovieStore();

  const [likesList, setLikesList] = useState<any>([]);
  const [watchLaterList, setWatchLaterList] = useState<any>([]);
  const [tab, setTab] = useState(0);

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  const handleClick = (movieId: number) => {
    saveSearchMovieId(movieId);
  };

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
      <div>
        {[likesList, watchLaterList][tab].map((movie: any, i: number) => (
          <li key={movie.title + i}>
            <button type="button" onClick={() => handleClick(movie.id)} className="cursor-pointer">
              <Image
                src={`${baseImgUrl}w342${movie.poster_path}`}
                alt=""
                width={342}
                height={450}
                quality={100}
                className="rounded-lg"
              />
              <span>{movie.title}</span>
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default MyMovies;
