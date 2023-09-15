'use client';

import React, { useEffect } from 'react';

const LeaveCheck = () => {
  //새로고침, 브라우저 닫기 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  //뒤로가기 방지
  useEffect(() => {
    const preventGoBack = () => {
      if (confirm('정말 나가시겠습니까? \n작성중인 내용이 모두 사라집니다.')) {
        history.go(-1);
      } else {
        history.pushState(null, '', location.href);
      }
    };
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);

  return <></>;
};

export default LeaveCheck;
