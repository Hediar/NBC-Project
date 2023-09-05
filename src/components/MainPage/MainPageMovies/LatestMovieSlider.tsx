import Image from 'next/image';
import { baseImgUrl } from '@/static/baseImgUrl';
import LatestMoviesCarousel from '../Carousel/LatestMoviesCarousel';
import Link from 'next/link';

type Props = {
  photoData: MovieData[];
};

const LatestMovieSlider = ({ photoData }: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-44 rounded-md font-thin text-xl my-3">
      <LatestMoviesCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <div
              key={idx}
              className="relative w-[740px] h-[608px] border border-solid rounded-[20px] overflow-hidden bg-gradient-to-r from-[#F3C2B0] to-[#FFF2DD]"
            >
              <Link href={`/detail/${imageData.id}`} className="absolute top-0 left-0 z-10">
                <Image
                  layout="fill"
                  src={`${baseImgUrl}w533_and_h300_bestv2${imageData.poster_path}`}
                  className="object-cover rounded-md"
                  alt="Image"
                />
              </Link>
              <div className="absolute bottom-0 left-0 right-0 h-[98px] bg-gradient-to-r from-[#BF3100] to-[#FFF2DD]"></div>
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
