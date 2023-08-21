'use client';

import DragDrop from '@/components/common/DragDrop';
import { supabase } from '@/supabase/config';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Params {
  movieId: string;
}

type Props = {
  params: Params;
};

const ReviewPage = ({ params }: Props) => {
  const router = useRouter();

  const { movieId } = params;

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [files, setFiles] = React.useState<string[]>([]);

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('files[0] => ', files[0].name);
    // const { data, error } = await supabase.storage.from('reviews').upload('reviews', files[0]);
    // const fileName = `./${email}/${files[0].name}`;

    try {
      // await supabase.from('reviews').insert([{ movieid: movieId, userid: '테스트유저ID', title, content }]);

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ movieid: movieId, userid: 'e5afe493-7a1f-416d-86b0-3d9b70e78592', title, content }])
        .select();
      console.log('1. spbase 성공 데이터 => ', data);
      console.log('2. spbase 에러 데이터 => ', error);
    } catch (error) {
      console.log(error);
    }

    // redirect('/');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <h1 className="mb-5">리뷰 쓰기</h1>
      <form onSubmit={addPost}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
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
          <label className="block text-gray-700 text-sm font-bold mb-2">이미지 업로드</label>
          <DragDrop setFiles={setFiles} />

          <button>제출하기</button>
          <button onClick={handleCancel}>돌아가기</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewPage;
