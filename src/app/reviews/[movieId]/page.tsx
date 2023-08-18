'use client';

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

  const handleCancel = () => {
    router.back();
  };

  // 이미지 작업 중
  // const fileInput = useRef(null)
  const handleImage = async (e: any) => {

  }

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

          {/* <a href="#" onClick={() => fileInput.current.click() } > 
    		 <Image src={image} width={150} height={150} alt="프로필 이미지" /> 
    	 </a> */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input-file">
            이미지 업로드
          </label>
          <input
            id="input-file"
            name="image_URL"
            type="file"
            accept='image/*'
            // ref={fileInput}
            onChange={handleImage}
          />
          <button>제출하기</button>
          <button onClick={handleCancel}>돌아가기</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewPage;
