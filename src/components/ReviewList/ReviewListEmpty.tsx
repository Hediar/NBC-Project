import React from 'react';

type Props = {};

const ReviewListEmpty = (props: Props) => {
  return (
    <div>
      작성한 리뷰가 없습니다. <br /> <button>리뷰 작성하기</button>
    </div>
  );
};

export default ReviewListEmpty;
