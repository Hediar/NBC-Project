import RecommendationList from '@/components/UserPage/RecommendationList/_RecommendationList';
import React from 'react';

interface Props {
  params: {
    username: string;
  };
}

const RecommendationPage = ({ params }: Props) => {
  return (
    <div>
      <RecommendationList params={params} />
    </div>
  );
};

export default RecommendationPage;
