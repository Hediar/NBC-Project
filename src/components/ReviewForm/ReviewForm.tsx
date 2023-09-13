'use client';

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
import { addReview, saveWatchList, updateReview } from '@/api/review';
import StarBox from './StarBox';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { getDetailData } from '@/api/tmdb';
import { Modal, message } from 'antd';
import { debounce } from 'lodash';

interface Props {
  movieId?: string;
  editReview?: ReviewsTable;
  movieButtonRef: React.RefObject<HTMLButtonElement>;
}

const ReviewForm = ({ movieId, editReview, movieButtonRef }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { userInfo } = useUserInfoStore();
  const { saveSearchMovieId } = useReviewMovieStore();

  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  const [IsConfirmed, setIsConfirmed] = React.useState(false);

  const [checkedListC1, checkHandlerC1, setCheckedListC1] = useCheckbox();
  const [checkedListC2, checkHandlerC2, setCheckedListC2] = useCheckbox();
  const [checkedListC3, checkHandlerC3, setCheckedListC3] = useCheckbox();
  const [checkedListC4, checkHandlerC4, setCheckedListC4] = useCheckbox();
  const [checkedListC5, checkHandlerC5, setCheckedListC5] = useCheckbox();
  const checkedListIndex = [checkedListC1, checkedListC2, checkedListC3, checkedListC4, checkedListC5];
  const checkHandlerIndex = [checkHandlerC1, checkHandlerC2, checkHandlerC3, checkHandlerC4, checkHandlerC5];

  const {
    formState: { isSubmitting, isSubmitted, errors },
    register,
    getValues,
    setValue,
    handleSubmit,
    control
  } = useForm();

  const fieldArray = useFieldArray({
    control,
    name: 'tagList' // 폼 필드 배열의 이름
  });

  const addPost = async ({ selectedDate, review, content, tagList, rating }: any) => {
    if (!userInfo.id)
      return messageApi.open({
        type: 'warning',
        content: '로그인 정보가 없습니다.'
      });
    if (!movieId && movieButtonRef.current !== null) {
      messageApi.open({
        type: 'warning',
        content: '선택된 영화가 없습니다.'
      });
      return movieButtonRef.current.focus();
    }

    const { title } = (await getDetailData(movieId!)) as MovieData;

    const newReview = {
      movieid: movieId,
      movie_title: title,
      userid: userInfo.id,
      date: selectedDate,
      category: JSON.stringify(checkedListIndex),
      review,
      rating,
      keyword: tagList,
      content
    } as ReviewsTable;

    try {
      const { data, error } = editReview
        ? await updateReview(editReview.reviewid!, newReview)
        : await addReview(newReview);
      if (error)
        return messageApi.open({
          type: 'error',
          content: '리뷰를 등록할 수 없습니다. ' + error.message
        });

      await saveWatchList(userInfo.id!, movieId!);
      saveTempReview();
      messageApi.open({
        type: 'success',
        content: '리뷰가 등록되었습니다.'
      });

      router.push(`/review/${data![0].reviewid}`);
      router.refresh();
    } catch (error) {
      if (error)
        return messageApi.open({
          type: 'error',
          content: '오류가 발생하였습니다. ' + error
        });
    }
  };

  // 임시저장 기능
  const { tempReview, saveTempReview } = useReviewStore();
  const handleTempSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const { selectedDate, review, content, tagList, rating } = getValues();

    const newReview = {
      movieid: movieId,
      userid: userInfo.id,
      date: selectedDate,
      category: JSON.stringify(checkedListIndex),
      review,
      rating,
      keyword: tagList,
      content
    } as ReviewsTable;

    saveTempReview(newReview);

    messageApi.open({
      type: 'success',
      content: '임시저장이 완료되었습니다.'
    });
  };

  // form에 내용 채우기
  useEffect(() => {
    if (editReview || tempReview) {
      const getConfirm = () => {
        !IsConfirmed && setIsSearchModalOpen(true);
        return IsConfirmed;
      };
      const GetReviewForm = () => {
        const isEditTempReview = editReview && tempReview && editReview.reviewid == tempReview.reviewid && getConfirm();
        const isTempReview = tempReview && userInfo.id == tempReview.userid && getConfirm();

        if (isEditTempReview) return tempReview;
        else if (editReview) return editReview;
        else if (isTempReview) return tempReview;
      };

      const reviewForm = GetReviewForm();
      if (!reviewForm) return;

      const { movieid, date, category, review, keyword, rating, content } = reviewForm;
      const categoryArr = JSON.parse(category);
      const keywordArr = keyword!.map((item: string) => {
        if (typeof item === 'object') {
          return item;
        } else {
          return JSON.parse(item);
        }
      });

      setCheckedListC1(categoryArr[0]);
      setCheckedListC2(categoryArr[1]);
      setCheckedListC3(categoryArr[2]);
      setCheckedListC4(categoryArr[3]);
      setCheckedListC5(categoryArr[4]);

      setValue('selectedDate', new Date(date as string));
      setValue('review', review);
      setValue('keyword', keywordArr);
      setValue('content', content);
      setValue('rating', rating || 0);

      console.log('폼 채우기 movieid => ', movieid);
      saveSearchMovieId(movieid);
    }
  }, [userInfo, IsConfirmed]);

  const handleCancel = () => {
    router.back();
  };

  const handleModalOk = () => {
    setIsSearchModalOpen(false);
    setIsConfirmed(true);
  };

  const handleModalCancel = () => {
    setIsSearchModalOpen(false);
    setIsConfirmed(false);
  };

  return (
    <>
      {contextHolder}
      <form>
        <div className="mb-4">
          <label className="form-title" htmlFor="date">
            콘텐츠 본 날짜
            <abbr title="필수입력" className="required">
              <span>필수입력</span>
            </abbr>
          </label>
          <Controller
            name="selectedDate"
            control={control}
            rules={{ required: true }}
            aria-invalid={isSubmitted ? (errors.selectedDate ? 'true' : 'false') : undefined}
            render={({ field: { onChange, onBlur, value, ref, name } }) => (
              <ReactDatePicker
                ref={(elem: any) => {
                  elem && ref(elem.input);
                }}
                name={name}
                selected={value}
                onChange={onChange}
                onBlur={onBlur}
                className="custom_input"
                maxDate={new Date()}
                locale={ko}
                dateFormat="yyyy/MM/dd" // 날짜 형태
                placeholderText="YYYY/MM/DD"
                autoComplete="off"
              />
            )}
          />
          {errors.selectedDate && (
            <small role="alert" className="text-red-500 font-medium text-sm ml-3">
              필수 입력입니다.
            </small>
          )}

          <label className="form-title" htmlFor="review">
            어떤 점이 좋았나요?
            <abbr title="필수입력" className="required">
              <span>필수입력</span>
            </abbr>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
            {REVIEW_CATEGORY_LIST.map((category, i) => (
              <CategoryBox
                key={'reviewCate' + i}
                CATEGORY={category}
                boxIndex={i}
                checkedList={checkedListIndex[i]}
                checkHandler={checkHandlerIndex[i]}
              />
            ))}
          </div>
          <label className="form-title" htmlFor="review">
            리뷰 한줄평
            <abbr title="필수입력" className="required">
              <span>필수입력</span>
            </abbr>
          </label>
          <input
            className="custom_input"
            id="review"
            type="text"
            placeholder="리뷰를 작성하세요"
            {...register('review', { required: true })}
            aria-invalid={isSubmitted ? (errors.review ? 'true' : 'false') : undefined}
          />
          {errors.review && (
            <small role="alert" className="text-red-500 font-medium text-sm ml-3">
              필수 입력입니다.
            </small>
          )}
          <label className="form-title" htmlFor="review">
            별점
            <abbr title="필수입력" className="required">
              <span>필수입력</span>
            </abbr>
          </label>
          <div>
            <StarBox fieldName="rating" setValue={setValue} defaultValue={getValues().rating} />
          </div>
          <label className="form-title" htmlFor="review">
            키워드
          </label>
          <HashTagBox fieldArray={fieldArray} defaultValue={getValues().keyword} />
          <label className="form-title" htmlFor="content">
            메모
          </label>
          <textarea
            className="custom_input h-40"
            id="content"
            placeholder="내용을 작성하세요"
            {...register('content')}
          />
          <div className="button_wrap">
            <button type="button" onClick={handleCancel} className="button-white">
              돌아가기
            </button>
            <button type="button" onClick={handleTempSave} className="button-white">
              임시저장
            </button>
            <button
              type="button"
              onClick={handleSubmit(debounce(addPost, 300))}
              disabled={isSubmitting}
              className="button-dark"
            >
              {isSubmitting ? '작성 중' : editReview ? '리뷰 수정하기' : '리뷰 작성하기'}
            </button>
          </div>
        </div>
      </form>

      <Modal open={isSearchModalOpen} onCancel={handleModalCancel} footer={null} width={400}>
        <p className="pt-[50px] pb-[30px] text-center text-neutral-800 text-xl font-normal leading-normal">
          작성 중이던 내용이 있습니다
          <br />
          이어서 작성하시겠습니까?
        </p>
        <div className="flex justify-center gap-3 mb-5">
          <button className="button-white" onClick={handleModalCancel}>
            취소
          </button>
          <button className="button-dark" onClick={handleModalOk}>
            확인
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ReviewForm;
