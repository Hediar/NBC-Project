'use client';

import React, { useEffect, useRef, useState } from 'react';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import { useDiscussionStore } from '@/store/useDiscussionStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { message } from 'antd';
import { debounce } from 'lodash';
import { getDetailData } from '@/api/tmdb';
import { addNewDiscussionPost } from '@/api/supabase-discussion';
import useLeaveConfirmation from '@/hooks/useLeaveConfiramation';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import SearchPopup from '@/components/ReviewForm/SearchPopup';
import LeaveCheck from '@/components/common/LeaveCheck';
import ContinueConfirmationModal from '@/components/common/ContinueConfirmationModal';
import OptionInputBox from '@/components/Discussion/regist/OptionInputBox';
import DiscussionStyleBox from '@/components/Discussion/regist/DiscussionStyleBox';

const marginYGap = '25px';
const titleLengthLimit = 50;
const contentLengthLimit = 200;

const DiscussionRegistPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isSearchModalOpen, openSearchModal } = useSearchModalStore();
  const { searchMovieId: movieId, saveSearchMovieId } = useReviewMovieStore();
  const { tempDiscussionPost, saveTempDiscussionPost } = useDiscussionStore();
  const [movieData, setMovieData] = useState<MovieData | null>();
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(true);

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const movie_id = searchParams.get('movieId') ?? '';

  const { confirmationModal } = useLeaveConfirmation(isBlocked);

  useEffect(() => {
    if (tempDiscussionPost && userId === tempDiscussionPost.userId) setIsConfirmModalOpen(true);
  }, []);

  useEffect(() => {
    return saveSearchMovieId();
  }, []);

  useEffect(() => {
    const getMovieData = async () => {
      const movieIdToFetch = movieId || movie_id;
      if (movieIdToFetch) {
        const fetchData = await getDetailData(movieIdToFetch as string);
        if (fetchData) {
          setMovieData(fetchData);
          return;
        }
      }
    };
    getMovieData();

    return () => {
      setMovieData(null);
    };
  }, [movieId, movie_id]);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const deleteOption = (idx: number) => {
    setOptions(options.filter((_, index) => index !== idx));
  };

  const changeOption = (idx: number, newText: string) => {
    setOptions(options.map((option, index) => (index === idx ? (option = newText) : option)));
  };

  const handleCancel = () => router.back();

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
      const optionCheck = options.filter((option) => option.trim().length).length;
      if (optionCheck < 2) {
        messageApi.open({
          type: 'warning',
          content: '투표 토론일 시 선택지는 2개 이상이어야 합니다'
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
        movie_genreIds: movieData?.genres.map((genre) => genre.id) as number[],
        vote_count: 0,
        view_count: 0,
        comment_count: 0
      };

      await addNewDiscussionPost(newPost, isOptionOpen, options);

      messageApi.open({
        type: 'success',
        content: '토론 글이 작성되었습니다'
      });

      saveTempDiscussionPost();
      router.refresh();
      router.push('/discussion/list');
    } catch (error) {}
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= titleLengthLimit) {
      setTitle(newTitle);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= contentLengthLimit) {
      setContent(newContent);
    }
  };

  const handleTempSave = () => {
    const newTempPost = {
      title,
      content,
      movieId,
      options,
      userId
    };

    saveTempDiscussionPost(newTempPost);
    setIsBlocked(false);
    messageApi.open({ type: 'success', content: '임시저장이 완료되었습니다.' });
  };

  const handleModalCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const handleModalOk = () => {
    setIsConfirmModalOpen(false);

    if (tempDiscussionPost) {
      const { title, content, movieId, options: savedOptions } = tempDiscussionPost;

      setTitle(title as string);
      setContent(content as string);
      saveSearchMovieId(movieId);

      if (savedOptions) {
        setOptions(savedOptions);
      }
    }
  };

  return (
    <>
      <LeaveCheck />
      <ContinueConfirmationModal open={isConfirmModalOpen} onCancel={handleModalCancel} onOk={handleModalOk} />
      {contextHolder}
      {confirmationModal}

      <div className="sm:p-5 w-full sm:w-4/5 lg:w-3/5 mx-auto">
        <h1 className={`text-2xl font-bold mb-[25px]`}>토론 작성</h1>
        <div className="info-box">
          {movieId || movie_id ? (
            <ReviewMovie movieId={movieId ?? movie_id} />
          ) : (
            <div className="w-full h-[15vh] flex justify-center items-center">
              <button
                className="bg-black text-white rounded-[10px] text-sm sm:text-base font-bold py-1.5 px-3"
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
              onChange={handleTitleChange}
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
              onChange={handleContentChange}
            />
            <span className="text-gray-300 text-sm">
              {content.length}/{contentLengthLimit}
            </span>
          </div>
        </div>

        <div className={`mt-[${marginYGap}]`}>
          <DiscussionStyleBox
            isManualOpen={isManualOpen}
            handleManual={setIsManualOpen}
            isOptionOpen={isOptionOpen}
            handleOptionOpen={setIsOptionOpen}
          />
        </div>

        <div className={`mt-[${marginYGap}] font-bold`}>
          {isOptionOpen && (
            <>
              {options.map((option, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <OptionInputBox idx={idx} option={option} deleteOption={deleteOption} changeOption={changeOption} />
                  </React.Fragment>
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
          <button className="button-white" onClick={handleCancel}>
            돌아가기
          </button>
          <button className="button-white" onClick={handleTempSave}>
            임시저장
          </button>
          <button className="button-dark" onClick={debounce(handleSubmit, 300)}>
            토론 게시하기
          </button>
        </div>
      </div>
    </>
  );
};

export default DiscussionRegistPage;
