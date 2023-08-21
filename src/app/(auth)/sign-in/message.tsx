'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Message = () => {
  const params = useSearchParams();
  const errorMessage = params.get('error');

  return <div>{errorMessage && <span className="text-red-500">{errorMessage}</span>}</div>;
};

export default Message;
