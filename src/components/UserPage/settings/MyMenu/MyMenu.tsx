import React from 'react';
import { cookies } from 'next/headers';
import ToggleIsPublic from './ToggleIsPublic';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getUserIsPublicData from '@/api/supabase/getUserIsPublicData';

const MyMenu = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const userId = user!.id;

  const is_publicData = await getUserIsPublicData(supabase, userId);

  const { watch_later, movielikes, reviews, discussion_post } = is_publicData!;

  return (
    <div className="p-10">
      <div className="w-full sm:w-10/12 bg-white border border-[#888] shadow-sm shadow-gray-400 px-8 py-10 rounded-2xl">
        <h1 className="text-neutral-800 font-bold mb-4 text-lg">나의 목록 공개</h1>
        <div className="flex flex-col gap-4">
          <ToggleIsPublic
            key="watch_later"
            title="찜 목록"
            columnName="watch_later"
            isPublic={watch_later}
            userId={userId}
          />
          <ToggleIsPublic
            key="movielikes"
            title="좋아요 목록"
            columnName="movielikes"
            isPublic={movielikes}
            userId={userId}
          />
          <ToggleIsPublic key="reviews" title="나의 리뷰" columnName="reviews" isPublic={reviews} userId={userId} />
          <ToggleIsPublic
            key="discussion_post"
            title="나의 토론"
            columnName="discussion_post"
            isPublic={discussion_post}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default MyMenu;
