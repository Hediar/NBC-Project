import { ArrowRight, Comment } from '@/styles/icons/Icons24';
import Link from 'next/link';
import React from 'react';

interface Props {
  relatedDiscussionData: DiscussionPost;
  relatedOption: DiscussionOption[];
}

const RelatedDiscussionPost = ({ relatedDiscussionData, relatedOption }: Props) => {
  return (
    <div className="w-full mt-5 border border-[#EBEBEB] rounded-[20px] bg-white shadow1 pointer-events-none flex flex-col">
      <div className="flex flex-col p-5">
        <p className="body1_regular_suit">{relatedDiscussionData.movie_title}</p>
        <p className="subtitle2_suit">{relatedDiscussionData.title}</p>
      </div>

      <div className="bg-[#EBEBEB] rounded-b-[20px] w-full p-5 flex flex-col">
        <div className="flex gap-5 justify-between items-center body1_bold_suit">
          <div className="flex gap-3">
            {!!relatedOption.length ? (
              <span>👆투표수&nbsp;{relatedDiscussionData.vote_count}</span>
            ) : (
              <span className="flex">
                <Comment />
                자유토론
              </span>
            )}
            <span>💬댓글수&nbsp;{relatedDiscussionData.comment_count}</span>
          </div>

          <Link
            href={`/discussion/detail/${relatedDiscussionData.post_id}`}
            className="flex items-center justify-center text-white pointer-events-auto"
          >
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedDiscussionPost;
