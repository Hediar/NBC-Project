import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  // recommendation으로 접속했을 때, recommendations로 보내기
  return NextResponse.redirect(`${url.href}s`);
};
