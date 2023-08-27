'use client';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {}

//+추가해야할것: 무비 검색해서 movieId 가져오는기능~
const DiscussionRegistPage = (props: Props) => {
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [optionContent, setOptionContent] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);

  const router = useRouter();

  const addOption = () => {
    const newOption = optionContent;
    setOptions([...options, newOption]);
    setOptionContent('');
  };

  const deleteOption = (idx: number) => {
    setOptions(options.filter((_, index) => index !== idx));
  };

  const handleSubmit = async () => {
    if (!userId) return;
    try {
      const newPost = {
        user_id: userId,
        title,
        content
      };
      const { data } = await supabase.from('discussion_post').insert(newPost).select();

      for (let i = 0; i < options.length; i++) {
        const newOption = {
          post_id: data![0].post_id,
          content: options[i],
          count: 0
        };
        console.log('선택지순서=>', newOption);
        await supabase.from('discussion_option').insert(newOption);
      }
      // options.map(async (option) => {
      // const newOption = {
      //   post_id: data![0].post_id,
      //   content: option,
      //   count: 0
      // };
      // console.log('선택지순서=>', newOption);
      // await supabase.from('discussion_option').insert(newOption);
      // });

      alert('토론글이 작성되었습니다');

      router.push('/discussion/list/1');
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      setTitle('');
      setContent('');
      setOptionContent('');
      setOptions([]);
    };
  }, []);

  return (
    <div className="p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <label htmlFor="topic">주제</label>
            <input
              type="text"
              name="topic"
              className="border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="explanation">설명</label>
            <input
              type="text"
              name="explanation"
              className="border"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="m-5">
          {options.map((option, idx) => {
            return (
              <div key={idx} className="flex gap-2">
                <p>{option}</p>
                <button onClick={() => deleteOption(idx)}>삭제</button>
              </div>
            );
          })}
          <input
            type="text"
            placeholder="선택지를 추가하세요"
            name="addOption"
            value={optionContent}
            onChange={(e) => setOptionContent(e.target.value)}
          ></input>
          <button onClick={addOption}>+</button>
        </div>

        <button onClick={handleSubmit}>작성</button>
      </form>
    </div>
  );
};

export default DiscussionRegistPage;
