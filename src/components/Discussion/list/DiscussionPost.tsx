'use client';

import { getDiscussionPostOption } from '@/api/supabase-discussion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { baseImgUrl } from '@/static/baseImgUrl';
import Image from 'next/image';

interface Props {
  post: DiscussionPost;
}

const DiscussionPost = ({ post }: Props) => {
  const [optionData, setOptionData] = useState<DiscussionOption[]>();

  useEffect(() => {
    const fetchData = async () => {
      const optionData = await getDiscussionPostOption(post.post_id);
      setOptionData(optionData);
    };
    fetchData();
  }, []);

  return (
    <Link
      href={`/discussion/detail/${post.post_id}`}
      className="h-[174px] sm:h-[150px] overflow-auto flex p-2 pb-6 sm:pb-2 items-center border rounded-xl shadow1 relative"
    >
      <div className="flex justify-center items-center p-3">
        <div className="h-[90px] mx-auto flex justify-center">
          <Image
            src={`${baseImgUrl}w300_and_h450_bestv2${post.movie_imgUrl}`}
            alt="테스트"
            className="h-full aspect-[2/3]"
            width={60}
            height={90}
          />
        </div>
      </div>

      <div className="w-3/5 p-1">
        <div className="w-full overflow-x-auto flex flex-col gap-1">
          <p className="body3_suit absolute top-3 left-5 sm:relative sm:top-auto sm:left-auto">{post.movie_title}</p>
          <p className="text-sm sm:text-base font-bold">
            {post.title.length > 25 ? post.title.slice(0, 25) + '...' : post.title}
          </p>
          <div>
            <div className="w-full flex text-sm overflow-hidden whitespace-nowrap text-ellipsis">
              {optionData?.length ? (
                <>
                  {optionData?.map((option, idx) =>
                    idx === optionData.length - 1 ? (
                      <div
                        key={option.option_id}
                        className="h-[29px] px-3 py-1.5 bg-white rounded-[22px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
                      >
                        <p className="text-neutral-800 text-sm font-normal leading-[17px]">
                          {option.content.length > 15 ? option.content.slice(0, 15) + '...' : option.content}
                        </p>
                      </div>
                    ) : (
                      <div key={option.option_id} className="flex items-center">
                        <div className="h-[29px] px-3 py-1.5 bg-white rounded-[22px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex">
                          <p className="text-neutral-800 text-sm font-normal leading-[17px]">
                            {option.content.length > 15 ? option.content.slice(0, 15) + '...' : option.content}
                          </p>
                        </div>
                        <div className="text-zinc-500 text-[13px] font-normal leading-[14px]">VS</div>
                      </div>
                    )
                  )}
                </>
              ) : (
                <div className="h-[29px] px-3 py-1.5 bg-white rounded-[22px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex">
                  <p className="text-neutral-800 text-sm font-normal leading-[17px]">자유토론</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute w-4/5 left-5 bottom-4 body3_suit sm:text-sm break-words m-auto flex items-center justify-between sm:gap-1 sm:w-1/5 sm:bottom-auto sm:left-auto sm:relative sm:flex-col">
        <p>👀확인:{post.view_count}</p>
        {!optionData?.length || <p>👆투표수:{post.vote_count}</p>}
        <p>💬댓글수:{post.comment_count}</p>
      </div>
    </Link>
  );
};

export default DiscussionPost;
