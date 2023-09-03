import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
interface Props {
  relatedDiscussionData: DiscussionPost;
  relatedOption: DiscussionOption[];
}
const RelatedDiscussionPost = ({ relatedDiscussionData, relatedOption }: Props) => {
  if (relatedOption.length > 2) {
    const slicedRelatedOption = relatedOption.slice(0, 2);

    return <RelatedDiscussionPost relatedDiscussionData={relatedDiscussionData} relatedOption={slicedRelatedOption} />;
  }
  return (
    <div className="w-full aspect-[5/4.1] mt-5 border rounded-lg bg-gray-200 shadow-[8px_8px_5px_0_rgba(88,88,88,0.3)] pointer-events-none flex flex-col items-center">
      <div className="h-1/3 w-4/5 flex flex-col items-center justify-center">
        <p className="text-sm">{relatedDiscussionData.movie_title}</p>
        <p className="text-base font-bold">{relatedDiscussionData.title}</p>
      </div>

      <div className="bg-white w-full h-2/3 p-2 flex flex-col items-center">
        <div className="w-full h-2/3 flex flex-col items-center justify-center">
          {relatedOption.length ? (
            relatedOption.map((option, idx) => {
              if (relatedOption.length === 1 || idx === 1) {
                return (
                  <div key={option.option_id} className="w-4/5 border p-1 text-sm flex justify-center rounded">
                    <p>{option.content}</p>
                  </div>
                );
              }
              return (
                <>
                  <div key={option.option_id} className="w-4/5 border p-1 text-sm flex justify-center rounded">
                    <p>{option.content}</p>
                  </div>
                  <p className="font-bold text-sm">VS</p>
                </>
              );
            })
          ) : (
            <p>{relatedDiscussionData.content}</p>
          )}
        </div>

        {relatedOption.length ? (
          <div className="w-4/5 h-1/3 flex gap-5 justify-between items-center text-sm font-bold">
            <div className="flex gap-3">
              {' '}
              <span>👆투표수&nbsp;{relatedDiscussionData.vote_count}</span>
              <span>💬댓글수&nbsp;{relatedDiscussionData.view_count}</span>
            </div>

            <Link
              href={`/discussion/detail/${relatedDiscussionData.post_id}`}
              className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-white pointer-events-auto"
            >
              <FaChevronRight />
            </Link>
          </div>
        ) : (
          <div className="w-4/5 h-1/3 flex gap-5 justify-between items-center text-sm font-bold">
            <div>
              {' '}
              <span>댓글수&nbsp;{relatedDiscussionData.view_count}</span>
            </div>

            <Link
              href={`/discussion/detail/${relatedDiscussionData.post_id}`}
              className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-white pointer-events-auto"
            >
              <FaChevronRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedDiscussionPost;
