/* eslint-disable @next/next/no-img-element */
import { getDiscussionPostOption } from '@/api/supabase-discussion';
import Link from 'next/link';
import React from 'react';
import altImage from '../../../../public/anonymous-avatar-icon.png';
interface Props {
  post: DiscussionPost;
}

const DiscussionPost = async ({ post }: Props) => {
  const optionData = await getDiscussionPostOption(post.post_id);
  // const movieData = await getMovieDetail(post.movie_Id)
  // const { data: optionData } = await supabase.from('discussion_option').select('*').eq('post_id', post.post_id);

  return (
    <div className="w-full flex p-5 items-center border-b">
      <div className="flex flex-col justify-center items-center gap-2 w-[5%]">
        <p className="text-sm">글번호</p>
        <p className="mx-3 text-sm">{post.post_id}</p>
      </div>

      <div className="h-[5.5rem] w-[5%]">
        {/* 선택된 토론대상무비 이미지 넣을부분. */}
        <img src={`${altImage}`} alt="테스트" className="w-4/5 h-4/5 m-2 border" />
      </div>
      <Link href={`/discussion/detail/${post.post_id}`} className="hover:cursor-pointer w-4/5">
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
      <div>
        <p>👀조회수:{post.view_count}</p>
        <p>👆투표수:{post.vote_count}</p>
        <p>💬댓글수:{post.comment_count}</p>
      </div>
    </div>
  );
};

export default DiscussionPost;
