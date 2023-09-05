import { baseImgUrl } from '@/static/baseImgUrl';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
  //   const formData = await request.formData();
  //   const posterPath = String(formData.get('posterPath'));

  // const colorExtractor = (): number[] => {
  //   const averageRGB: number[] = [];
  //   const image = new Image();
  //   image.src = `${baseImgUrl}w300_and_h450_bestv2${`FcbAHK6Vrt0GClMRUxH8TsgC2JqL.jpg`}`;
  //   image.onload = () => {
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas?.getContext('2d');
  //     canvas.width = image?.width;
  //     canvas.height = image?.height;
  //     ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
  //     const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
  //     const pixels = imageData?.data as Uint8ClampedArray;

  //     let redSum = 0;
  //     let greenSum = 0;
  //     let blueSum = 0;

  //     for (let i = 0; i < pixels?.length; i += 4) {
  //       redSum += pixels[i];
  //       greenSum += pixels[i + 1];
  //       blueSum += pixels[i + 2];
  //     }

  //     const pixelCount = pixels.length / 4;
  //     const averageRed = Math.round(redSum / pixelCount);
  //     const averageGreen = Math.round(greenSum / pixelCount);
  //     const averageBlue = Math.round(blueSum / pixelCount);
  //     averageRGB.push(averageRed, averageGreen, averageBlue);
  //   };

  //   return averageRGB;
  // };
  // const rgb = colorExtractor();

  // console.log('평균알지비추출==>>', rgb);

  return NextResponse.json({ error: false, message: '이미지픽완료' });
};
