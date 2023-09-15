// RGB 값을 그레이 스케일로 변환하는 함수
const rgbToGrayScale = (rgb: number[]): number => {
  const [r, g, b] = rgb;
  return 0.2989 * r + 0.587 * g + 0.114 * b;
};
export const getColors = async (imageurl: string) => {
  const formData = new FormData();
  formData.append('imageUrl', imageurl.toString());
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/imagecolorpicker`, {
    method: 'post',
    body: formData
  });
  const data = await res.json();
  const rgb = data.message;
  return rgb;
};

export const findBrightestTwoColors = (colors: number[][]): number[][] => {
  if (colors.length < 2) {
    throw new Error('There must be at least two colors in the input array');
  }

  let brightestColors: number[][] = [];
  let brightestGrayScales: number[] = [];

  for (const color of colors) {
    const grayScale = rgbToGrayScale(color);

    if (brightestColors.length < 2) {
      brightestColors.push(color);
      brightestGrayScales.push(grayScale);
    } else {
      // Find the index of the minimum gray scale value in the current brightest colors
      const minIndex = brightestGrayScales.indexOf(Math.min(...brightestGrayScales));

      // If the current color has a higher gray scale value than the minimum in the current brightest colors
      if (grayScale > brightestGrayScales[minIndex]) {
        // Replace the color at the minimum index with the current color
        brightestColors[minIndex] = color;
        brightestGrayScales[minIndex] = grayScale;
      }
    }
  }

  return brightestColors;
};

export const extractMainColors = (rgb: number[][], numberOfMainColors: number): number[][] => {
  // 주요 색상 추출을 위한 정사각형 평균 RGB 값을 복제
  const clonedSquareAverages = [...rgb];

  // 주요 색상을 저장할 배열 초기화
  const mainColors: number[][] = [];

  for (let i = 0; i < numberOfMainColors; i++) {
    // 남은 정사각형 중에서 가장 높은 평균 RGB 값을 찾음
    const highestAverageIndex = clonedSquareAverages.findIndex((avg) => {
      return !mainColors.some((color) => color.every((channel, index) => channel === avg[index]));
    });

    if (highestAverageIndex !== -1) {
      const mainColor = clonedSquareAverages.splice(highestAverageIndex, 1)[0];
      mainColors.push(mainColor);
    } else {
      // 더 이상 주요 색상을 찾을 수 없을 때 종료
      break;
    }
  }

  return mainColors;
};

// 밝기 조절
export const lightenColor = (rgb: number[]) => {
  const [r, g, b] = rgb;
  const factor = 0.8; // 조절하려는 밝기 정도 (0.2는 20% 밝게 조절)

  const newR = Math.min(r + (255 - r) * factor, 255);
  const newG = Math.min(g + (255 - g) * factor, 255);
  const newB = Math.min(b + (255 - b) * factor, 255);

  return [newR, newG, newB];
};
