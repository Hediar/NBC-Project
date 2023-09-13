import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';
import getUserIsPublicData from './api/supabase/getUserIsPublicData';
import publicApi from './util/supabase/auth/public';

export async function middleware(req: NextRequest) {
  // '/user-page/[username]/recommendation' 진입 시 '/user-page/[username]/recommendations'로 리디렉트
  if (req.nextUrl.pathname.endsWith('/recommendation')) {
    return NextResponse.rewrite(new URL(`${req.nextUrl.pathname}s`, req.url));
  }
  // '/user-page/[username]/like' 진입 시 '/user-page/[username]/likes'로 리디렉트
  if (req.nextUrl.pathname.endsWith('/like')) {
    return NextResponse.redirect(new URL(`${req.nextUrl.pathname}s`, req.url));
  }

  // '/user-page/[username]/likes' 진입 시 1. 로그인 안 한 사용자면 로그인 유도, 해당 사용자가 목록을 오픈하지 않았으면 비공개 안내 페이지로 이동
  if (req.nextUrl.pathname.endsWith('/likes')) {
    const baseUrl = new URL(req.url).origin;
    const res = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req, res });
    const pageUsername = decodeURIComponent(req.nextUrl.pathname.split('/')[2]);

    const { id: pageUserId } = await publicApi.get('username to id', { username: pageUsername });

    const { movielikes: isMovieLikesPagePublic } = await getUserIsPublicData(supabase, pageUserId!);

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      const newUrl = req.nextUrl.pathname.replace('likes', 'info');
      return NextResponse.redirect(baseUrl + newUrl + '?sign-in=true');
    }
    const signedInUserId = data.session!.user.id;

    const { data: signedInUserData } = await supabase
      .from('users')
      .select('username')
      .eq('id', signedInUserId)
      .single();

    const signedInUsername = signedInUserData?.username;

    if (pageUsername !== signedInUsername && !isMovieLikesPagePublic) {
      return NextResponse.redirect(baseUrl + req.nextUrl.pathname + '/private');
    }

    return res;
  }

  // '/user-page/[username]' 페이지로 진입 시 '/user-page/[username]/info' 로 리디렉트
  if (req.nextUrl.pathname.split('/').length - 1 === 2 && req.nextUrl.pathname.startsWith('/user-page/')) {
    const baseUrl = new URL(req.url).origin;
    return NextResponse.redirect(baseUrl + req.nextUrl.pathname + '/info');
  }
}

export const config = {
  matcher: ['/user-page/:path/recommendation', '/user-page/:path/like', '/user-page/:path/likes', '/user-page/:path/']
};
