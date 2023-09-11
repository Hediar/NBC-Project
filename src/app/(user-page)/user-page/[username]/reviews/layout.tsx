import doesUsersMatch from '@/api/doesUserMatch';
import getUserIsPublicData from '@/api/supabase/getUserIsPublicData';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

interface Params {
  params: {
    username: string;
  };
}

export const dynamic = 'force-dynamic';

export const generateMetadata = ({ params: { username } }: Params) => {
  const decodedUsername = decodeURIComponent(username);

  return {
    title: `${decodedUsername}의 리뷰 페이지 | 영화를 봅시다`,
    description: `${decodedUsername}님이 작성하신 리뷰 페이지입니다.`
  };
};

export default async function Layout({
  params,
  children
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userIdData } = await supabase.from('users').select('id').eq('username', username);

  // layout에서 검증하므로 ! 사용
  const userId = userIdData![0].id;

  // 비공개 처리된 상태면 다른 유저들에게서 보이지 않기
  const is_publicData = await getUserIsPublicData(supabase, userId);
  const { reviews: isPublic } = is_publicData;
  const isOwnPage = await doesUsersMatch(supabase, username);

  if (!isPublic && !isOwnPage) {
    return (
      <div className="w-full bg-white pb-10">
        <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)] gap-16">
          <h2 className="text-center font-bold text-2xl">{username}님의 리뷰 목록</h2>
          <p className="text-2xl ">{username}님의 리뷰 목록이 비공개 상태입니다.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-[1280px] p-5">
      <Suspense fallback={'서스펜스 되냐?'}>{children}</Suspense>
    </div>
  );
}
