import Link from 'next/link';
import React from 'react';
import OptionVote from './OptionVote';
import EditDeleteBox from './EditDeleteBox';
import { getDiscussionPostOption, getNextDiscussionPost, getPrevDiscussionPost } from '@/api/supabase-discussion';
import { SVGNextButton, SVGPrevButton } from '@/styles/icons/IconsETC';
import supabase from '@/supabase/config';
import Image from 'next/image';

type Props = {
  postData: DiscussionPost;
};

const DiscussionTopic = async ({ postData }: Props) => {
  const [prevPostData, nextPostData, optionData, { data: userData }] = await Promise.all([
    getPrevDiscussionPost({ postId: postData.post_id, movieId: postData.movie_id }),
    getNextDiscussionPost({ postId: postData.post_id, movieId: postData.movie_id }),
    getDiscussionPostOption(postData.post_id),
    supabase.from('users').select('*').eq('id', postData.user_id).single()
  ]);

  return (
    <div className="mt-[50px]">
      <h3 className="h3_suit flex">이 영화 토픽</h3>
      <div className="flex flex-col justify-between">
        <header className="w-full h-[60px] mt-10 rounded-[20px] bg-[#FFCF1F] flex gap-3 items-center px-6">
          <div>
            <Image src={userData.avatar_url} alt="Image" width={40} height={40} className="rounded-full" />
          </div>
          <span className="subtitle2_suit">{userData.username}</span>
        </header>

        <section className="min-h-[438px] px-[62px] py-[54px] flex flex-col items-center relative mt-5 border border-[#888888] rounded-[40px]">
          <div className="flex flex-col justify-center items-center gap-[10px]">
            <h3 className="h4_suit">{postData?.title}</h3>
            <p className="body1_regular_suit text-[#888888]">{postData?.content}</p>
          </div>

          {optionData?.length ? (
            <OptionVote postId={postData.post_id} voteCount={postData.vote_count} checkUpdate={optionData!.length} />
          ) : (
            <div className="h-[272px] flex items-center">
              <div className="bg-[#3977F0] text-white p-2 flex flex-col gap-2  justify-center items-center rounded-[20px] font-bold">
                <p>투표컨텐츠가 없는 토론글입니다.</p>
                <p>보다 자유롭게 주제에 대해서 토론해주세요</p>
              </div>
            </div>
          )}

          {prevPostData?.length ? (
            <Link
              href={`/discussion/detail/${prevPostData[0].post_id}`}
              className="absolute top-1/2 -translate-y-2/4 left-0 flex items-center justify-center"
            >
              <SVGPrevButton />
            </Link>
          ) : null}
          {nextPostData?.length ? (
            <Link
              href={`/discussion/detail/${nextPostData[0].post_id}`}
              className="absolute top-1/2 -translate-y-2/4 right-0 flex items-center justify-center"
            >
              <SVGNextButton />
            </Link>
          ) : null}
        </section>

        <div className="mb-10">
          <EditDeleteBox postId={postData.post_id} authorId={postData.user_id} />
        </div>

        <div className="border-b"></div>

        <div className="body1_bold_suit flex gap-5 my-10">
          <span>👆&nbsp;투표수&nbsp;{postData.vote_count}</span>
          <span>💬&nbsp;댓글수&nbsp;{postData.comment_count}</span>
        </div>
      </div>
    </div>
  );
};

export default DiscussionTopic;
