'use client';

import { supabase } from '@/supabase/config';
import { redirect } from 'next/navigation';
import React from 'react';

interface Params {
  movieId: string;
}
const ReviewPage = ({ params }: { params: Params }) => {
  const { movieId } = params;

  const [content, setContent] = React.useState('');

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await supabase.from('reviews').insert([{ movieid: movieId, userid: '테스트유저ID', content }]);
    } catch (error) {
      console.log(error);
    }

    // redirect('/');
  };

  return (
    <div>
      <h1 className="mb-5">리뷰 쓰기</h1>
      <form onSubmit={addPost}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
            id="content"
            name="content"
            type="text"
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          />
          <button>제출</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewPage;
