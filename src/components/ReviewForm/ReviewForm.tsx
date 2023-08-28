'use client';

import supabase from '@/supabase/config';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import useCheckbox from '@/hooks/useCheckbox';
import { REVIEW_CATEGORY_LIST } from '@/static/review';
import CategoryBox from '@/components/ReviewForm/CategoryBox';
import HashTagBox from '@/components/ReviewForm/HashTagBox';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { useReviewMovieStore, useReviewStore } from '../../store/useReviewStore';
import { addReview, updateReview } from '@/api/review';

interface Props {
  movieId?: string;
  editReview?: ReviewsTable;
}

const ReviewForm = ({ movieId, editReview }: Props) => {
  const router = useRouter();
  const { userInfo } = useUserInfoStore();

  const [selectedDate, setSelectedDate] = React.useState<string | Date | null>(null);
  const [review, setReview] = React.useState('');
  const [content, setContent] = React.useState('');

  const [checkedListC1, checkHandlerC1, setCheckedListC1] = useCheckbox();
  const [checkedListC2, checkHandlerC2, setCheckedListC2] = useCheckbox();
  const [checkedListC3, checkHandlerC3, setCheckedListC3] = useCheckbox();
  const checkedListIndex = [checkedListC1, checkedListC2, checkedListC3];
  const checkHandlerIndex = [checkHandlerC1, checkHandlerC2, checkHandlerC3];

  // 해시태그를 담을 배열
  const [tagList, setTagList] = React.useState<string[] | []>([]);

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInfo) return alert('로그인 정보가 없습니다.');

    const newReview = {
      movieid: movieId,
      userid: userInfo.id, // Q:: 유저 인증 막혀서 insert 정책을 true로 풀고 테스트 중
      date: selectedDate,
      category: JSON.stringify(checkedListIndex),
      review,
      keyword: tagList,
      content
    } as ReviewsTable;

    try {
      const { data, error } = editReview
        ? await updateReview(editReview.reviewid!, newReview)
        : await addReview(newReview);
      if (error) return alert('오류가 발생하였습니다. 죄송합니다.' + error.message);

      saveTempReview();
      alert('저장 완');
      router.push(`/review/${data![0].reviewid}`);
    } catch (error) {
      console.log('에러 => ', error);
    }
  };

  // 임시저장 기능
  const { tempReview, saveTempReview } = useReviewStore();
  const { saveSearchMovieId } = useReviewMovieStore();
  const handleTempSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const newReview = {
      movieid: movieId,
      userid: userInfo.id,
      date: selectedDate,
      category: JSON.stringify(checkedListIndex),
      review,
      keyword: tagList,
      content
    };
    saveTempReview(newReview);

    alert('임시저장 완료');
  };

  // form에 내용 채우기
  useEffect(() => {
    if (editReview || tempReview) {
      const GetReviewForm = () => {
        const TEMP_CONFIRM_TEXT = '작성 중이던 내용이 있습니다. 이어서 작성하시겠습니까?';
        const isEditTempReview =
          editReview && tempReview && editReview.reviewid == tempReview.reviewid && confirm(TEMP_CONFIRM_TEXT);
        const isTempReview = tempReview && userInfo.id == tempReview.userid && confirm(TEMP_CONFIRM_TEXT);

        if (isEditTempReview) return tempReview;
        else if (editReview) return editReview;
        else if (isTempReview) return tempReview;
      };
      console.log('GetReviewForm => ', GetReviewForm());
      const reviewForm = GetReviewForm();
      if (!reviewForm) return;

      const { movieid, date, category, review, keyword, content } = reviewForm;
      const categoryArr = JSON.parse(category);

      setSelectedDate(new Date(date!));
      setCheckedListC1(categoryArr[0]);
      setCheckedListC2(categoryArr[1]);
      setCheckedListC3(categoryArr[2]);
      setReview(review);
      setTagList(keyword!);
      setContent(content);

      saveSearchMovieId(movieid);
    }
  }, [userInfo]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <form onSubmit={addPost}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            영화 본 날짜
          </label>
          <ReactDatePicker
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
            id="selectedDate"
            name="selectedDate"
            locale={ko}
            dateFormat="yyyy/MM/dd" // 날짜 형태
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
            selected={selectedDate as Date}
            placeholderText="YYYY/MM/DD"
            onChange={(date) => setSelectedDate(date)}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
            어떤 점이 좋았나요?
          </label>
          {REVIEW_CATEGORY_LIST.map((category, i) => (
            <CategoryBox
              key={'reviewCate' + i}
              CATEGORY={category}
              checkedList={checkedListIndex[i]}
              checkHandler={checkHandlerIndex[i]}
            />
          ))}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
            리뷰 한줄평
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
            id="review"
            name="review"
            type="text"
            placeholder="리뷰를 작성하세요"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
            키워드
          </label>
          <HashTagBox tagList={tagList} setTagList={setTagList} />
          <small>쉼표 혹은 스페이스바를 입력하여 태그를 등록 할 수 있습니다. 등록된 태그를 클릭하면 삭제됩니다.</small>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            메모
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
            id="content"
            name="content"
            type="text"
            placeholder="내용을 작성하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleTempSave}>임시저장</button>
          <br />
          <br />
          <button>{editReview ? '리뷰 수정하기' : '리뷰 작성하기'}</button>
          {/* <button onClick={handleCancel}>돌아가기</button> */}
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
