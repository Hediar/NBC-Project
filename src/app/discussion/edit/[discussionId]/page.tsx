import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const page = ({ params }: Props) => {
  const { discussionId } = params;
  //discussionId로 글 가져와서 수정하는 페이지
  return <div>page</div>;
};

export default page;
