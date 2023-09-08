import Image from 'next/image';
import { baseImgUrl } from '@/static/baseImgUrl';
import LatestMoviesCarousel from '../Carousel/LatestMoviesCarousel';
import Link from 'next/link';
import { StarFill } from '@/styles/icons/Icons24';
import { extractMainColors, findBrightestTwoColors } from '@/api/findColors';

type Props = {
  photoData: MovieData[];
};

const LatestMovieSlider = async ({ photoData }: Props) => {
  const getStyles = await Promise.all(
    photoData.map(async (data: MovieData) => {
      const poster = `${baseImgUrl}w780${data.poster_path}`;
      const formData = new FormData();
      formData.append('imageUrl', poster.toString());
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/imagecolorpicker`, {
        method: 'post',
        body: formData
      });
      const rgb = await res.json();
      return rgb.message;
    })
  );
  const rgbToString = (rgb: number[]) => `rgb(${rgb.join(', ')})`;

  const getMainColors = getStyles.map((colors) => {
    const mainColor = extractMainColors(colors, 1)[0];
    return rgbToString([...mainColor, 0.6]);
  });

  const firstMainColor = getStyles.map((colors) => rgbToString([colors[8], 0.5]));
  // const bottomColor = getStyles.map((colors) => rgbToString([colors[7]]));
  // 밝기 조절
  const lightenColor = (rgb: number[]) => {
    const [r, g, b] = rgb;
    const factor = 0.8; // 조절하려는 밝기 정도 (0.2는 20% 밝게 조절)

    const newR = Math.min(r + (255 - r) * factor, 255);
    const newG = Math.min(g + (255 - g) * factor, 255);
    const newB = Math.min(b + (255 - b) * factor, 255);

    return [newR, newG, newB];
  };

  const bottomColor = getStyles.map((colors) => rgbToString(lightenColor(colors[7])));

  const getBrightColors = getStyles.map((colors, index) => {
    const brightColors = findBrightestTwoColors(colors);

    const transparentBrightColors = brightColors.map((color, subIndex) => {
      const opacity = subIndex === 0 ? 0.5 : 0.2; // 투명도
      return rgbToString([...color, opacity]);
    });

    return transparentBrightColors;
  });

  return (
    <div className="w-full p-5 h-auto md:h-[608px] font-thin text-xl my-3 mr-5">
      <LatestMoviesCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <div key={idx}>
              <div
                className="relative w-full h-full sm:w-auto md:h-[608px] shadow border rounded-[20px] border-gray-200 overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, ${firstMainColor[idx]} 0%, ${getBrightColors[idx][0]} 45%, ${getBrightColors[idx][1]} 100%)`,
                  filter: `brightness(1.07)`
                }}
              >
                <Link href={`/detail/${imageData.id}`} className="absolute top-[30px] left-7">
                  <Image
                    width={320}
                    height={480}
                    src={`${baseImgUrl}w780${imageData.poster_path}`}
                    className="object-cover rounded-md"
                    alt="Image"
                  />
                </Link>
                <div className="absolute bottom-[251px] left-[370px]">
                  <h2 className="subtitle2_suit">{imageData.title}</h2>
                  <div className="flex gap-1 items-center">
                    <span className="text-[14px]">{imageData.release_date}</span>
                  </div>
                  <div className="flex gap-[6px] items-center">
                    <StarFill />
                    <span>{(imageData.vote_average / 2).toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div
                className="absolute body1_regular_suit truncate p-[30px] bottom-0 left-0 right-0 h-32 justify-center items-center rounded-bl-[20px] rounded-br-[20px] border border-gray-200 "
                style={{
                  background: `linear-gradient(90deg, ${bottomColor[idx]} 0%, #FBFBFB 100%)`
                }}
              >
                {imageData.overview}
              </div>
            </div>
          );
        })}
        options={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          inViewThreshold: 0.7
        }}
        slideHeight="h-[608px]"
        slideWidth="w-full"
      />
    </div>
  );
};

export default LatestMovieSlider;
