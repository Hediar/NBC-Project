import MainPageLoading from '@/components/MainPage/MainPageSkeleton';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import React from 'react';

const loading = () => {
  // return <LoadingSpinner />;
  return <MainPageLoading />;
};

export default loading;
