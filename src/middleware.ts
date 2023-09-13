import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';
import getUserIsPublicData from './api/supabase/getUserIsPublicData';
import publicApi from './util/supabase/auth/public';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.endsWith('/recommendation')) {
    return NextResponse.rewrite(new URL(`${req.nextUrl.pathname}s`, req.url));
  }
  if (req.nextUrl.pathname.endsWith('/like')) {
    return NextResponse.redirect(new URL(`${req.nextUrl.pathname}s`, req.url));
  }

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
}

export const config = {
  matcher: ['/user-page/:path/recommendation', '/user-page/:path/like', '/user-page/:path/likes']
};
