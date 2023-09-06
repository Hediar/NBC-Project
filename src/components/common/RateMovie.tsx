'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Rate, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const desc = ['최악이에요', '별로에요', '보통이에요', '볼만해요', '최고에요'];

const RateMovie = ({ title, movieId }: { title: string; movieId: string }) => {
  const [value, setValue] = useState<number>(0);
  const router = useRouter();
  const path = usePathname();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const rateHandler = async () => {
      if (value === 0) return;

      const data = await fetch('/movies/rate-movie', {
        method: 'POST',
        body: JSON.stringify({ movieId, ratings: value })
      });
      const res = await data.json();
      if (res.message.includes('성공')) {
        messageApi.open({
          type: 'success',
          content: '등록되었습니다.'
        });
        router.replace(`${path}#${movieId}`);
      }
    };

    rateHandler();
  }, [value]);

  return (
    <>
      {contextHolder}
      <div className="p-8 rounded-lg flex flex-col gap-2 items-center w-64">
        <h1 className="text-center font-semibold text-xl text-gray-700">{title}</h1>
        <h2 className="text-gray-600">평점을 등록해주세요.</h2>
        <Rate onChange={setValue} allowHalf tooltips={desc} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </div>
    </>
  );
};

export default RateMovie;
