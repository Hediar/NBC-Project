/* eslint-disable @next/next/no-img-element */
import { getDiscussionPostOption } from '@/api/supabase-discussion';
import Link from 'next/link';
import React from 'react';
import altImage from '../../../../public/anonymous-avatar-icon.png';
import { baseImgUrl } from '@/static/baseImgUrl';
interface Props {
  post: DiscussionPost;
}

const DiscussionPost = async ({ post }: Props) => {
  const optionData = await getDiscussionPostOption(post.post_id);

  return (
    <div className="w-4/5 mx-auto flex p-2 items-center border-b">
      <div className="w-[20%] flex justify-center items-center">
        <div className="w-1/3 flex flex-col justify-center items-center gap-2 p-1">
          <span className="text-sm">글번호</span>
          <span className="mx-3 text-sm">{post.post_id}</span>
        </div>

        <div className="w-2/3 h-[13vh] mx-auto flex justify-center">
          {/* 선택된 토론대상무비 이미지 넣을부분. */}
          <img
            src={`${baseImgUrl}w300_and_h450_bestv2${post.movie_imgUrl}`}
            alt="테스트"
            className="h-full aspect-[3/4]"
          />
        </div>
      </div>

      <Link href={`/discussion/detail/${post.post_id}`} className="hover:cursor-pointer w-3/5 p-1">
        <div className="w-full flex flex-col gap-1">
          <p className="text-xs">{post.movie_title}</p>
          <p className="text-base font-bold">{post.title}</p>
          <div>
            <p className="w-4/5 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
              {optionData?.length ? (
                <>
                  {optionData?.map((option, idx) =>
                    idx === optionData.length - 1 ? (
                      <React.Fragment key={idx}>{option.content}</React.Fragment>
                    ) : (
                      <React.Fragment key={idx}>{option.content + ' VS '}</React.Fragment>
                    )
                  )}
                </>
              ) : (
                <React.Fragment>자유토론</React.Fragment>
              )}
            </p>
          </div>
        </div>
      </Link>

      <div className="text-sm break-words w-1/5 m-auto flex flex-col items-center">
        <p>👀조회수:{post.view_count}</p>
        <p>👆투표수:{post.vote_count}</p>
        <p>💬댓글수:{post.comment_count}</p>
      </div>
    </div>
  );
};

export default DiscussionPost;
