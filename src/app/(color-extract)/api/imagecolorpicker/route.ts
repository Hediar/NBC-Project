import { baseImgUrl } from '@/static/baseImgUrl';
import axios from 'axios';
import sharp from 'sharp';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const poster_path = String(formData.get('posterPath'));

  const imageUrl = `${baseImgUrl}w300_and_h450_bestv2${poster_path}`;
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

  const image = sharp(response.data)
    .withMetadata() // 메타데이터 유지
    .toColorspace('srgb') // 색상 프로파일 설정
    .resize({ width: 200, height: 300, fit: 'inside', kernel: 'lanczos3' }) // 원하는 크기로 조정
    .toFormat('png');

  const imageData = await image.raw().toBuffer({ resolveWithObject: true });

  const pixels = imageData.data;

  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    totalRed += pixels[i];
    totalGreen += pixels[i + 1];
    totalBlue += pixels[i + 2];
  }

  const pixelCount = pixels.length / 4;
  const avgRed = Math.round(totalRed / pixelCount);
  const avgGreen = Math.round(totalGreen / pixelCount);
  const avgBlue = Math.round(totalBlue / pixelCount);

  const avgRGB = [avgRed, avgGreen, avgBlue];
  console.log('평균rgb==>', avgRGB);
  console.log('==>', pixels.length);
  return NextResponse.json({ error: false, message: JSON.stringify(avgRGB) });
};
