// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export const dynamic = 'force-dynamic';

// export async function supabaseMiddleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   await supabase.auth.getSession();
//   return res;
// }

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 첫 번째 미들웨어 함수 정의
function customMiddleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

// // 두 번째 미들웨어 함수 정의
// async function supabaseMiddleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   await supabase.auth.getSession();
//   return res;
// }

// // 세 번째 미들웨어 함수 정의
// async function supabaseRefreshSession(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   await supabase.auth.refreshSession();
//   return res;
// }

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // 첫 번째 미들웨어 실행
  const customResponse = await customMiddleware(req);

  // 두 번째 미들웨어 실행
  // const supabaseResponse = await supabaseMiddleware(req);

  // const refreshSession = await supabaseRefreshSession(req);

  // 필요한 로직을 수행한 후 최종 응답 반환
  // 이 예시에서는 customResponse를 반환하도록 합칩니다.
  return customResponse;
}
