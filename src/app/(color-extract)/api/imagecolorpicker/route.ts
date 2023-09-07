import axios from 'axios';
import sharp from 'sharp';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  async function getImageData(imageUrl: string) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const image = sharp(response.data)
      .withMetadata()
      .toColorspace('srgb')
      .resize({ width: 300, height: 450, fit: 'inside', kernel: 'lanczos3' })
      .toFormat('png');

    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    return { data, info };
  }

  // 이미지 데이터 가져오기
  const formData = await request.formData();
  const imageUrl = String(formData.get('imageUrl'));
  const { data, info } = await getImageData(imageUrl);

  const { channels } = info;
  const channelSums = [0, 0, 0];
  const squareAverages = [];

  const gridSize = 4;
  const squareWidth = Math.floor(info.width / gridSize);
  const squareHeight = Math.floor(info.height / gridSize);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const startX = col * squareWidth;
      const startY = row * squareHeight;

      for (let i = startY; i < startY + squareHeight; i++) {
        for (let j = startX; j < startX + squareWidth; j++) {
          const pixelIndex = (i * info.width + j) * channels;
          for (let k = 0; k < channels; k++) {
            channelSums[k] += data[pixelIndex + k];
          }
        }
      }

      // 각 정사각형의 평균 RGB 값을 계산하고 배열에 추가
      const squarePixelCount = squareWidth * squareHeight;
      const squareChannelAverages = channelSums.map((sum) => Math.round(sum / squarePixelCount));
      squareAverages.push(squareChannelAverages);

      // channelSums 배열 초기화
      channelSums.fill(0);
    }
  }

  return NextResponse.json({ error: false, message: squareAverages });
};
