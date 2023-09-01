'use client';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import SearchPopup from '@/components/ReviewForm/SearchPopup';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import useToggleSignInModal from '@/store/toggleSignInModal';
import supabase from '@/supabase/config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getMovieDetail } from '@/api/tmdb';
import { optionMark } from '@/static/optionMark';

interface Props {}

interface Option {
  text: string;
}

const DiscussionRegistPage = (props: Props) => {
  const { isSearchModalOpen, openSearchModal } = useSearchModalStore();
  const { searchMovieId: movieId, saveSearchMovieId } = useReviewMovieStore();
  const [movieData, setMovieData] = useState<MovieData>();

  useEffect(() => {
    return saveSearchMovieId();
  }, []);

  useEffect(() => {
    const getMovieData = async () => {
      if (movieId) {
        const fetchData = await getMovieDetail(movieId as string);
        setMovieData(fetchData);
      }
    };
    getMovieData();
  }, [movieId]);

  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([{ text: '' }, { text: '' }]);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(true);
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();

  const router = useRouter();

  const addOption = () => {
    const newOption = { text: '' };
    setOptions([...options, newOption]);
  };

  const deleteOption = (idx: number) => {
    setOptions(options.filter((_, index) => index !== idx));
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert('로그인 해주세요');
      return setIsSignInModalOpen(isSignInModalOpen);
    }
    if (!movieId) {
      alert('토론하고싶은 영화를 선택해주세요.');
      return openSearchModal();
    }
    try {
      const newPost = {
        user_id: userId,
        title,
        content,
        movie_id: movieId,
        movie_title: movieData?.title,
        movie_imgUrl: movieData?.poster_path,
        movie_genreIds: movieData?.genres.map((genre) => genre.id),
        vote_count: 0,
        view_count: 0,
        comment_count: 0
      };
      const { data } = await supabase.from('discussion_post').insert(newPost).select();

      if (isOptionOpen) {
        for (let i = 0; i < options.length; i++) {
          if (options[i].text.trim().length) {
            const newOption = {
              post_id: data![0].post_id,
              content: options[i].text
            };

            await supabase.from('discussion_option').insert(newOption);
          }
        }
      }

      alert('토론글이 작성되었습니다');

      router.push('/discussion/list/1');
    } catch (error) {}
  };

  return (
    <div className="p-5 w-3/5">
      {/* S:: 영화 선택 */}
      <div>
        {movieId ? (
          <ReviewMovie movieId={movieId as string} />
        ) : (
          <button
            onClick={() => {
              openSearchModal();
            }}
          >
            토론하고싶은 콘텐츠 고르기
          </button>
        )}
        {isSearchModalOpen && <SearchPopup />}
      </div>
      {/* E:: 영화 선택 */}

      <div className="flex flex-col gap-5 w-full mt-5">
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="topic">주제</label>
          <input
            type="text"
            name="topic"
            className="border p-2 rounded w-4/5"
            placeholder="내용을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="explanation">설명</label>
          <input
            type="text"
            name="explanation"
            className="border p-2 rounded w-4/5"
            placeholder="토론 주제를 설명해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="m-5">
        {isOptionOpen ? (
          <>
            <p className="font-bold p-2">{'투표기능(선택지 최대 10개)'}</p>
            {options.map((option, idx) => {
              return (
                <div key={idx} className="flex gap-2 items-center">
                  <div className="w-full">
                    <label htmlFor={`의견${optionMark[idx]}`}>의견{optionMark[idx]}</label>
                    <input
                      name={`의견${optionMark[idx]}`}
                      className="border w-full p-1 my-2 rounded"
                      type="text"
                      placeholder="내용을 입력해주세요"
                      onChange={(e) => {
                        option.text = e.target.value;
                      }}
                    />
                    {idx > 1 && (
                      <button
                        className="float-right text-sm font-bold text-gray-500 border px-2 py-1 rounded-xl m-1"
                        onClick={() => deleteOption(idx)}
                      >
                        취소
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {options.length < 10 && (
              <div className="flex justify-center my-5">
                <button className="border px-2 py-1 hover:bg-gray-200 rounded" onClick={addOption}>
                  <span>선택지 추가하기</span>
                </button>
              </div>
            )}
            <div className="mt-5 flex justify-end">
              <button
                className="border px-2 hover:bg-gray-200 rounded"
                onClick={() => {
                  setIsOptionOpen(false);
                }}
              >
                <span className="font-bold p-2">투표기능 사용안하기</span>
              </button>
            </div>
          </>
        ) : (
          <div className="mt-5 flex justify-center">
            <button
              className="border px-2 hover:bg-gray-200 rounded"
              onClick={() => {
                setIsOptionOpen(true);
              }}
            >
              <span className="font-bold p-2">투표기능 사용하기</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-3">
        <button className="border px-2 py-1 bg-gray-300 text-white font-bold hover:bg-gray-200 hover:text-gray-700 rounded">
          임시저장
        </button>
        <button
          className="border px-2 py-1 bg-black text-white font-bold hover:bg-gray-200 hover:text-gray-700 rounded"
          onClick={handleSubmit}
        >
          토론 게시하기
        </button>
      </div>
    </div>
  );
};

export default DiscussionRegistPage;
