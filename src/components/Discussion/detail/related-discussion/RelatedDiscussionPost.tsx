import Link from 'next/link';
import React from 'react';

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
    <div className="w-full aspect-[5/4.1] mt-5 p-2 border rounded-lg bg-gray-200 shadow-[8px_8px_5px_0_rgba(88,88,88,0.3)]">
      <p className="text-sm">{relatedDiscussionData.movie_title}</p>
      <p className="text-base">{relatedDiscussionData.title}</p>
      <div className="bg-white w-[95%]">
        {relatedOption.length ? (
          relatedOption.map((option, idx) => {
            if (relatedOption.length === 1 || idx === 1) {
              return (
                <div key={option.option_id}>
                  <p>{option.content}</p>
                </div>
              );
            }
            return (
              <div key={option.option_id}>
                <p>{option.content}</p>
                <p>VS</p>
              </div>
            );
          })
        ) : (
          <p>{relatedDiscussionData.content}</p>
        )}
        <div className="flex gap-5 justify-between">
          <div>
            {' '}
            <span>투표수&nbsp;{relatedDiscussionData.vote_count}</span>
            <span>댓글수&nbsp;{relatedDiscussionData.view_count}</span>
          </div>

          <Link href={`/discussion/detail/${relatedDiscussionData.post_id}`}>{'>'}</Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedDiscussionPost;
