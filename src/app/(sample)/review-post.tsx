import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/**
 * 리뷰 올릴 때 다음과 같이 작성 부탁드립니다.
 * user확인 후, 로그인된 유저만 리뷰 작성 가능합니다.
 */
const WriteReview = () => {
  const postReviewHandler = async (formData: FormData) => {
    'use server';
    const title = String(formData.get('title'));
    const content = String(formData.get('content'));
    const supabase = createServerActionClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      // reviews DB테이블 => {reviewid, userid, content, movieid, title}
      const data = await supabase
        .from('reviews')
        .insert({ userid: user.id, title, content, movieid: '영화 id 추가 필요' });
      console.log(data);
    }
  };
  return (
    <div>
      <form action={postReviewHandler}>
        <input type="text" name="title" className="border border-gray-700" />
        <input type="text" name="content" className="border border-gray-700" />
        <button className="border border-gray-700">click to post review</button>
      </form>
    </div>
  );
};

export default WriteReview;
