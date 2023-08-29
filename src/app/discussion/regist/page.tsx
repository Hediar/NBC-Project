'use client';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import SearchPopup from '@/components/ReviewForm/SearchPopup';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import useToggleSignInModal from '@/store/toggleSignInModal';
import supabase from '@/supabase/config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface Props {}

//+추가해야할것: 무비 검색해서 movieId 가져오는기능~
const DiscussionRegistPage = (props: Props) => {
  const { isSearchModalOpen, openSearchModal } = useSearchModalStore();
  const { searchMovieId: movieId, saveSearchMovieId } = useReviewMovieStore();

  useEffect(() => {
    return saveSearchMovieId();
  }, []);

  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [optionContent, setOptionContent] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const optionInputRef = useRef<HTMLInputElement>(null);
  const [optionValueCheck, setOptionValueCheck] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();

  const router = useRouter();

  const addOption = () => {
    if (optionContent) {
      const newOption = optionContent;
      setOptions([...options, newOption]);
      setOptionContent('');
    } else {
      if (optionInputRef.current instanceof HTMLInputElement) optionInputRef.current.focus();
      setOptionValueCheck(true);
    }
  };

  const deleteOption = (idx: number) => {
    setOptions(options.filter((_, index) => index !== idx));
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert('로그인 해주세요');
      return setIsSignInModalOpen(isSignInModalOpen);
    }
    try {
      const newPost = {
        user_id: userId,
        title,
        content,
        movie_id: movieId,
        vote_count: 0,
        view_count: 0,
        comment_count: 0
      };
      const { data } = await supabase.from('discussion_post').insert(newPost).select();
      console.log('선택지기능사용=>', isOpen);
      if (isOpen) {
        console.log('디버깅중!');
        for (let i = 0; i < options.length; i++) {
          const newOption = {
            post_id: data![0].post_id,
            content: options[i]
          };

          await supabase.from('discussion_option').insert(newOption);
        }
      }

      alert('토론글이 작성되었습니다');

      router.push('/discussion/list/1');
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      setTitle('');
      setContent('');
      setOptionContent('');
      setOptions([]);
    };
  }, []);

  return (
    <div className="p-5">
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
            리뷰 남길 콘텐츠 고르기
          </button>
        )}
        {isSearchModalOpen && <SearchPopup />}
      </div>
      {/* E:: 영화 선택 */}

      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <label htmlFor="topic">주제</label>
          <input type="text" name="topic" className="border" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <label htmlFor="explanation">설명</label>
          <input
            type="text"
            name="explanation"
            className="border"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="m-5">
          {isOpen ? (
            <>
              <p>{'투표기능(선택지 최대 10개)'}</p>
              {options.map((option, idx) => {
                return (
                  <div key={idx} className="flex gap-2">
                    <p>{option}</p>
                    <div onClick={() => deleteOption(idx)}>삭제</div>
                  </div>
                );
              })}

              {options.length < 10 && (
                <>
                  <input
                    ref={optionInputRef}
                    type="text"
                    placeholder="선택지를 추가하세요"
                    name="addOption"
                    value={optionContent}
                    onChange={(e) => setOptionContent(e.target.value)}
                    onClick={() => setOptionValueCheck(false)}
                  ></input>
                  {optionValueCheck && <p className="absolute z-10 text-xs text-red-300">내용을 입력해주세요</p>}
                  <button onClick={addOption}>+</button>
                </>
              )}
              <div className="mt-5">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  투표기능 사용안하기
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              투표기능 사용하기
            </button>
          )}
        </div>
      </form>
      <button onClick={handleSubmit}>작성</button>
    </div>
  );
};

export default DiscussionRegistPage;
