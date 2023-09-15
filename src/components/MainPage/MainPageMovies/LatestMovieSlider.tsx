import Image from 'next/image';
import { baseImgUrl } from '@/static/baseImgUrl';
import Link from 'next/link';
import { StarFill } from '@/styles/icons/Icons24';
import { findBrightestTwoColors, getColors, lightenColor } from '@/util/findColors';
import EmblaCarousel from '@/components/common/Slider/EmblaCarousel';

type Props = {
  photoData: MovieData[];
};

const LatestMovieSlider = async ({ photoData }: Props) => {
  const getStyles = await Promise.all(
    photoData.map(async (data: MovieData) => {
      const poster = `${baseImgUrl}w780${data.poster_path}`;
      const rgb = await getColors(poster);
      return rgb;
    })
  );
  const rgbToString = (rgb: number[]) => `rgb(${rgb.join(', ')})`;

  const firstMainColor = getStyles.map((colors) => rgbToString([colors[8], 0.5]));

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
    <>
      <div className="hidden xl:block w-full p-5 h-full md:h-[608px] font-thin text-xl my-3 mr-5">
        <EmblaCarousel
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
                  className="absolute body1_regular_suit p-[30px] bottom-0 left-0 right-0 h-32 justify-center items-center rounded-bl-[20px] rounded-br-[20px] border border-gray-200 "
                  style={{
                    background: `linear-gradient(90deg, ${bottomColor[idx]} 0%, #FBFBFB 100%)`
                  }}
                >
                  <div className="line-clamp-3">{imageData.overview}</div>
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
          buttonPosition="rightTop"
          isSlideLength={false}
        />
      </div>
      <div className="w-[320px] h-[657px] font-thin text-xl my-3 xl:hidden ">
        <EmblaCarousel
          slides={photoData.map((imageData, idx) => {
            return (
              <div key={idx}>
                <div
                  className="relative w-[320px] h-[657px] shadow border rounded-[20px] border-gray-200 overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, ${firstMainColor[idx]} 0%, ${getBrightColors[idx][0]} 45%, ${getBrightColors[idx][1]} 100%)`,
                    filter: `brightness(1.07)`
                  }}
                >
                  <Link href={`/detail/${imageData.id}`} className="absolute top-[30px] left-10">
                    <Image
                      width={240}
                      height={360}
                      src={`${baseImgUrl}w780${imageData.poster_path}`}
                      className="object-cover rounded-md"
                      alt="Image"
                    />
                  </Link>
                  <div className="absolute bottom-[175px] w-full">
                    <div className="flex flex-col space-y-1 items-center justify-center">
                      <h2 className="subtitle2_suit line-clamp-1">{imageData.title}</h2>
                      <div className="flex items-center text-center">
                        <div className="flex flex-wrap">
                          <span className="text-[14px]">{imageData.release_date}</span>
                          &nbsp;
                          <StarFill /> {(imageData.vote_average / 2).toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute body1_regular_suit p-[20px] bottom-0 left-0 right-0 h-32 justify-center items-center rounded-bl-[20px] rounded-br-[20px] border border-gray-200 "
                  style={{
                    background: `linear-gradient(90deg, ${bottomColor[idx]} 0%, #FBFBFB 100%)`
                  }}
                >
                  <div className="line-clamp-4">{imageData.overview}</div>
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
          slideHeight="h-[657px]"
          slideWidth="w-full"
          buttonPosition="center"
          isSlideLength={false}
          buttonPositionStyleL="left-1"
          buttonPositionStyleR="right-5"
        />
      </div>
    </>
  );
};

export default LatestMovieSlider;
