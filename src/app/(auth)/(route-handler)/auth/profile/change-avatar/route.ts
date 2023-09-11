import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const url = await req.json();
  console.log(url);
  return NextResponse.json({ url1: url });
};
