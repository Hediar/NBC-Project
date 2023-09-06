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
    <Link
      href={`/discussion/detail/${post.post_id}`}
      className="h-[150px] flex p-2 items-center border rounded-xl shadow1"
    >
      <div className="flex justify-center items-center p-3">
        <div className="h-[90px] mx-auto flex justify-center">
          {/* 선택된 토론대상무비 이미지 넣을부분. */}
          <img
            src={`${baseImgUrl}w300_and_h450_bestv2${post.movie_imgUrl}`}
            alt="테스트"
            className="h-full aspect-[2/3]"
          />
        </div>
      </div>

      <div className="w-3/5 p-1">
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
                <>자유토론</>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm break-words w-1/5 m-auto flex flex-col items-center">
        <p>👀조회수:{post.view_count}</p>
        {!optionData?.length || <p>👆투표수:{post.vote_count}</p>}
        <p>💬댓글수:{post.comment_count}</p>
      </div>
    </Link>
  );
};

export default DiscussionPost;
