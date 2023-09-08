'use client';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import SearchPopup from '@/components/ReviewForm/SearchPopup';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import supabase from '@/supabase/config';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { getMovieDetail } from '@/api/tmdb';
import { optionMark } from '@/static/optionMark';
import { message } from 'antd';
import { debounce } from 'lodash';

interface Props {}

interface Option {
  text: string;
}

const marginYGap = '25px';

const DiscussionRegistPage = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isSearchModalOpen, openSearchModal } = useSearchModalStore();
  const { searchMovieId: movieId, saveSearchMovieId } = useReviewMovieStore();
  const [movieData, setMovieData] = useState<MovieData | null>();
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const [title, setTitle] = useState<string>('');
  const titleLengthLimit = 50;
  if (title.length > titleLengthLimit) setTitle(title.slice(0, titleLengthLimit));

  const [content, setContent] = useState<string>('');
  const contentLengthLimit = 200;
  if (content.length > contentLengthLimit) setContent(content.slice(0, contentLengthLimit));

  const [options, setOptions] = useState<Option[]>([{ text: '' }, { text: '' }]);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(true);

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const movie_id = searchParams.get('movieId') ?? '';

  useEffect(() => {
    return saveSearchMovieId();
  }, []);

  useEffect(() => {
    const getMovieData = async () => {
      if (movieId) {
        const fetchData = await getMovieDetail(movieId as string);
        setMovieData(fetchData);
        return;
      }
      if (movie_id) {
        const fetchData = await getMovieDetail(movie_id as string);
        setMovieData(fetchData);
        return;
      }
    };
    getMovieData();

    return () => {
      setMovieData(null);
    };
  }, [movieId]);

  const addOption = () => {
    const newOption = { text: '' };
    setOptions([...options, newOption]);
  };

  const deleteOption = (idx: number) => {
    setOptions(options.filter((_, index) => index !== idx));
  };

  const handleSubmit = async () => {
    if (!userId) {
      messageApi.open({
        type: 'error',
        content: '로그인 해주세요'
      });
      return router.replace('?sign-in=true');
    }
    if (!movieData) {
      messageApi.open({
        type: 'warning',
        content: '토론하고싶은 영화를 선택해주세요'
      });
      return openSearchModal();
    }
    if (!title) {
      messageApi.open({
        type: 'warning',
        content: '토론 주제를 입력해주세요'
      });
      return titleRef.current!.focus();
    }
    if (isOptionOpen) {
      let optionCheck = 0;
      for (let i = 0; i < options.length; i++) {
        if (options[i].text.trim().length) optionCheck++;
      }
      if (optionCheck < 2) {
        messageApi.open({
          type: 'warning',
          content: '투표 토론일 시 선택지는 2개 이상이어야합니다'
        });
        return;
      }
    }
    try {
      const newPost = {
        user_id: userId,
        title,
        content,
        movie_id: movieData?.id,
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

      messageApi.open({
        type: 'success',
        content: '토론 글이 작성되었습니다'
      });

      router.refresh();
      router.push('/discussion/list');
    } catch (error) {}
  };

  return (
    <>
      {contextHolder}
      <div className="p-5 w-3/5">
        <h1 className={`text-2xl font-bold mb-[25px]`}>토론 작성</h1>
        {/* S:: 영화 선택 */}
        <div>
          {movieId || movie_id ? (
            <ReviewMovie movieId={movieId ?? movie_id} />
          ) : (
            <div className="w-full h-[15vh] flex justify-center items-center">
              <button
                className="bg-black text-white rounded-[10px] font-bold py-1.5 px-3"
                onClick={() => {
                  openSearchModal();
                }}
              >
                토론하고싶은 콘텐츠 고르기
              </button>
            </div>
          )}
          {isSearchModalOpen && <SearchPopup />}
        </div>
        {/* E:: 영화 선택 */}

        <div className={`flex flex-col w-full mt-[${marginYGap}] font-bold`}>
          <div>
            <label htmlFor="topic">토론 주제*</label>
            <input
              className="border w-full px-[20px] py-[12px] rounded-[10px] mt-[6px]"
              ref={titleRef}
              type="text"
              name="topic"
              placeholder="내용을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="text-gray-300 text-sm">
              {title.length}/{titleLengthLimit}
            </span>
          </div>

          <div className={`mt-[${marginYGap}]`}>
            <label htmlFor="explanation">추가 설명</label>
            <input
              type="text"
              name="explanation"
              className="border w-full px-[20px] py-[12px] rounded-[10px] mt-[6px]"
              placeholder="토론 주제를 설명해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <span className="text-gray-300 text-sm">
              {content.length}/{contentLengthLimit}
            </span>
          </div>
        </div>

        <div className={`mt-[${marginYGap}]`}>
          <p className="font-bold relative">
            <span
              onMouseOver={() => {
                setIsManualOpen(!isManualOpen);
              }}
              onMouseLeave={() => {
                setIsManualOpen(!isManualOpen);
              }}
            >
              토론 방식*
            </span>
            {isManualOpen && <span className="text-sm text-red-300">토론방식은 추후 수정하실 수 없습니다</span>}
          </p>
          <div className="flex gap-3 mt-3">
            {isOptionOpen ? (
              <>
                <button
                  className="border px-20 py-3 rounded-[22px]"
                  onClick={() => {
                    setIsOptionOpen(false);
                  }}
                >
                  자유 토론
                </button>
                <button
                  className="border px-20 py-3 rounded-[22px] bg-black text-white"
                  onClick={() => {
                    setIsOptionOpen(true);
                  }}
                >
                  투표 토론
                </button>
              </>
            ) : (
              <>
                <button
                  className="border px-20 py-3 rounded-[22px] bg-black text-white"
                  onClick={() => {
                    setIsOptionOpen(false);
                  }}
                >
                  자유 토론
                </button>
                <button
                  className="border px-20 py-3 rounded-[22px]"
                  onClick={() => {
                    setIsOptionOpen(true);
                  }}
                >
                  투표 토론
                </button>
              </>
            )}
          </div>
        </div>

        <div className={`mt-[${marginYGap}] font-bold`}>
          {isOptionOpen && (
            <>
              {options.map((option, idx) => {
                return (
                  <div key={idx} className="flex gap-2 items-center">
                    <div className="w-full">
                      <div>
                        {idx <= 1 ? (
                          <label htmlFor={`의견${optionMark[idx]}`}>의견{optionMark[idx]}*</label>
                        ) : (
                          <label htmlFor={`의견${optionMark[idx]}`}>의견{optionMark[idx]}</label>
                        )}
                        {idx > 1 && (
                          <button
                            className="rounded-full p-1 ml-1 bg-gray-200"
                            onClick={() => deleteOption(idx)}
                          ></button>
                        )}
                      </div>

                      <input
                        name={`의견${optionMark[idx]}`}
                        className="border w-full px-3 py-1.5 my-2 rounded-[10px]"
                        type="text"
                        placeholder="내용을 입력해주세요"
                        onChange={(e) => {
                          option.text = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {options.length < 10 && (
                <div className="flex justify-center my-5">
                  <button
                    className="w-full border px-2 py-1 bg-gray-200 hover:bg-gray-100 rounded-[10px]"
                    onClick={addOption}
                  >
                    <span>+ 다른 의견 추가</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <button className="border px-2 py-1 bg-gray-300 text-white font-bold hover:bg-gray-200 hover:text-gray-700 rounded-[10px]">
            임시저장
          </button>
          <button
            className="border px-2 py-1 bg-black text-white font-bold hover:bg-gray-200 hover:text-gray-700 rounded-[10px]"
            onClick={debounce(handleSubmit, 300)}
          >
            토론 게시하기
          </button>
        </div>
      </div>
    </>
  );
};

export default DiscussionRegistPage;
