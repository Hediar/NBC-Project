import { supabase } from '@/supabase/config';
import React, { useState } from 'react';

type Props = {
  movieId: string;
};

const quickReviews = [
  '배우들의 연기력이 좋아요',
  '영화의 분위기가 잘 전달됩니다',
  '음악과 색감이 화려하고 조화로워요',
  '스토리가 예상치 못한 전개로 흥미로워요',
  '긴장감 있는 전환 포인트가 인상적이에요',
  '영상미가 아름답게 담겨져 있어요',
  '주변 풍경이 매력적이에요',
  '주제에 대한 메시지가 잘 담겨져 있어요',
  '영화를 보면서 생각할 거리를 많이 주는 것 같아요',
  '캐릭터들이 다양하고 독특해요',
  '특수효과와 CG가 눈에 띄게 멋져요',
  '대화와 대사들이 매우 신중하게 짜여져 있어요',
  '감정 표현이 자연스럽게 녹아들어있어요',
  '지루할 틈이 없이 계속해서 흥미를 끌어요',
  '감독의 섬세한 연출이 돋보였어요',
  '다음 이야기가 기대돼요!',
  '영화의 재미 요소가 확실히 느껴졌어요',
  '웃음과 긴장이 골고루 느껴졌습니다'
];

const MovieDetailQuickRating = ({ movieId }: Props) => {
  const [gaugeWidth, setGaugeWidth] = useState<number>(0);
  const [seletedReviews, setSeletedReviews] = useState<string[]>([]);
  const [userReview, setUserReview] = useState<string>('');
  const scores = [2, 4, 6, 8, 10];

  const updateGauge = (score: number) => {
    setGaugeWidth((score / 10) * 100);
  };

  const updateReviews = (review: string) => {
    if (!seletedReviews.includes(review)) {
      setSeletedReviews([...seletedReviews, review]);
      if (!userReview.includes(review)) {
        setUserReview((prev) => (prev += review + ' '));
      }
    } else {
      const filteredReviews = seletedReviews.filter((seletedReview) => seletedReview != review);
      setSeletedReviews(filteredReviews);
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
        quick_reviews: seletedReviews,
        score: gaugeWidth / 10
      })
      .select();
    console.log('movieLikes=>', res);
    setSeletedReviews([]);
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
            console.log('폼태그 테스트');
          }}
        >
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
