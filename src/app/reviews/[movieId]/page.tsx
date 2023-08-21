'use client';

import DragDrop from '@/components/common/DragDrop';
import { supabase } from '@/supabase/config';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import useCheckbox from '@/hooks/useCheckbox';
import CategoryBox from '@/components/ReviewForm/CategoryBox';

interface Params {
  movieId: string;
}

type Props = {
  params: Params;
};

const ReviewPage = ({ params }: Props) => {
  const router = useRouter();

  const { movieId } = params;

  const [date, setDate] = React.useState('');
  // const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [review, setReview] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  const [content, setContent] = React.useState('');
  // const [files, setFiles] = React.useState<string[]>([]);
  const [categoty01CheckedList, categoty01CheckHandler] = useCheckbox();
  const [categoty02CheckedList, categoty02CheckHandler] = useCheckbox();
  const DB에넣을예정 = [
    {
      title: '전체적으로',
      options: ['배우가 연기를 잘 해요', '영상미가 좋아요', '몰입도가 좋아요', '기승전결이 좋아요', '극 전개가 빨라요']
    },
    {
      title: '누구랑 본다면',
      options: [
        '가족이랑 보기 좋아요',
        '연인이랑 보기 좋아요',
        '친구랑 보기 좋아요',
        '아이랑 보기 좋아요',
        '부모님이랑 보기 좋아요'
      ]
    },
    {
      title: '이런 점이 좋았어요',
      options: [
        '가족이랑 보기 좋아요',
        '연인이랑 보기 좋아요',
        '친구랑 보기 좋아요',
        '아이랑 보기 좋아요',
        '부모님이랑 보기 좋아요'
      ]
    }
  ];

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // await supabase.from('reviews').insert([{ movieid: movieId, userid: '테스트유저ID', title, content }]);
      //
      // const { data, error } = await supabase
      //   .from('reviews')
      //   .insert([{ movieid: movieId, userid: 'e5afe493-7a1f-416d-86b0-3d9b70e78592', title, content }])
      //   .select();
      // console.log('1. spbase 성공 데이터 => ', data);
      // console.log('2. spbase 에러 데이터 => ', error);
    } catch (error) {
      console.log(error);
    }

    // redirect('/');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
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
          selected={selectedDate}
          placeholderText="YYYY/MM/DD"
          onChange={(date) => setSelectedDate(date)}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
          어떤 점이 좋았나요?
        </label>
        <div>
          {/* {
            DB에넣을예정.
          } */}
          <CategoryBox />
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
          리뷰 한줄평
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
          id="review"
          name="review"
          type="text"
          placeholder="리뷰를 작성하세요"
          onChange={(e) => setReview(e.target.value)}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
          키워드
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
          id="keyword"
          name="keyword"
          type="text"
          placeholder="내용을 작성하세요"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
          메모
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
          id="content"
          name="content"
          type="text"
          placeholder="내용을 작성하세요"
          onChange={(e) => setContent(e.target.value)}
        />
        {/* <label className="block text-gray-700 text-sm font-bold mb-2">이미지 업로드</label>
          <DragDrop setFiles={setFiles} /> */}

        {/* <button>임시저장</button> */}
        <button>리뷰 작성하기</button>
        {/* <button onClick={handleCancel}>돌아가기</button> */}
      </div>
    </form>
  );
};

export default ReviewPage;
