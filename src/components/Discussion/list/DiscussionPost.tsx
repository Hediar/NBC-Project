/* eslint-disable @next/next/no-img-element */
import { getDiscussionPostOption } from '@/api/supabase-discussion';
import supabase from '@/supabase/config';
import Link from 'next/link';
import React from 'react';

interface Props {
  post: DiscussionPost;
}

const DiscussionPost = async ({ post }: Props) => {
  const optionData = await getDiscussionPostOption(post.post_id);
  // const { data: optionData } = await supabase.from('discussion_option').select('*').eq('post_id', post.post_id);

  return (
    <div className="flex p-5 items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-sm">글번호</p>
        <p className="mx-3 text-sm">{post.post_id}</p>
      </div>

      <div className="h-[5.5rem]">
        {/* 선택된 토론대상무비 이미지 넣을부분. */}
        <img src="" alt="테스트" className="w-4/5 h-4/5 m-2 border" />
      </div>
      <Link href={`/discussion/detail/${post.post_id}`} className="hover:cursor-pointer">
        <p className="text-sm">콘텐츠제목표기</p>
        <p>{post.title}</p>
        <p className="text-sm">
          {optionData?.length ? (
            <>
              {optionData?.map((option, idx) =>
                idx === optionData.length - 1 ? (
                  <span key={idx}>{option.content}</span>
                ) : (
                  <span key={idx}>{option.content + ' VS '}</span>
                )
              )}
            </>
          ) : (
            <span>자유토론</span>
          )}
        </p>
      </Link>
    </div>
  );
};

export default DiscussionPost;
