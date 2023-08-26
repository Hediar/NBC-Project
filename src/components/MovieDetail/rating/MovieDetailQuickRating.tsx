'use client';
import { quickReviews } from '@/static/quickReviews';
import supabase from '@/supabase/config';
import React, { useState } from 'react';

interface Props {
  movieId: string;
}

const MovieDetailQuickRating = ({ movieId }: Props) => {
  const [gaugeWidth, setGaugeWidth] = useState<number>(0);
  const [seletedQuickReviews, setSeletedQuickReviews] = useState<string[]>([]);
  const [userReview, setUserReview] = useState<string>('');
  const scores = [2, 4, 6, 8, 10];

  const updateGauge = (score: number) => {
    setGaugeWidth((score / 10) * 100);
  };

  const updateReviews = (review: string) => {
    if (!seletedQuickReviews.includes(review)) {
      setSeletedQuickReviews([...seletedQuickReviews, review]);
    } else {
      const filteredReviews = seletedQuickReviews.filter((seletedQuickReviews) => seletedQuickReviews != review);
      setSeletedQuickReviews(filteredReviews);
    }
  };

  const userId = 'testUser4';
  const setRating = async () => {
    const check = await checkUserValidation();
    if (check) return;
    const res = await supabase
      .from('movie_reviews')
      .insert({
        movieId,
        userId: userId ?? null,
        review: userReview,
        quick_reviews: seletedQuickReviews,
        score: gaugeWidth / 10
      })
      .select();

    setSeletedQuickReviews([]);
    setUserReview('');
    setGaugeWidth(0);
    alert('등록완료!');
  };
  const checkUserValidation = async () => {
    const { data } = await supabase.from('movie_reviews').select('userId').eq('userId', userId);
    if (data!.length) {
      alert('이미 참여하셨습니다.');
      return true;
    } else return false;
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span>{'무비타이틀'}</span>
        <p>영화를 평가해주세요.</p>

        <div id="rating-gauge-cont" className="w-60 h-4 bg-gray-300 rounded-lg overflow-hidden mt-6">
          <div style={{ width: `${gaugeWidth}%` }} className="h-full bg-green-400 transition-all duration-500"></div>
        </div>
        <div id="rating-btn-cont">
          {scores.map((score, idx) => {
            return (
              <button
                key={idx}
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
                onClick={() => updateGauge(score)}
              >
                {score}점
              </button>
            );
          })}
        </div>
        <div id="quick-review-cont" className="flex flex-wrap gap-5">
          {quickReviews.map((quickReview, idx) => {
            return (
              <button className="" key={idx} onClick={() => updateReviews(quickReview)}>
                <p>{quickReview}</p>
              </button>
            );
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {seletedQuickReviews.map((quicReview, idx) => {
            return <div key={idx}>{quicReview}</div>;
          })}
          <input type="text" value={userReview} onChange={(e) => setUserReview(e.target.value)}></input>
          <button
            onClick={() => {
              setRating();
            }}
          >
            남기기
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieDetailQuickRating;
