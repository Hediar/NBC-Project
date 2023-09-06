import Image from 'next/image';
import { baseImgUrl } from '@/static/baseImgUrl';
import LatestMoviesCarousel from '../Carousel/LatestMoviesCarousel';
import Link from 'next/link';
import { StarFill } from '@/styles/icons/Icons24';

type Props = {
  photoData: MovieData[];
};

const LatestMovieSlider = ({ photoData }: Props) => {
  return (
    <div className="w-[740px] h-[608px] rounded-md font-thin text-xl my-3 mr-5">
      <LatestMoviesCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <div
              key={idx}
              className="relative w-[740px] h-[608px] border border-solid rounded-[20px] overflow-hidden bg-gradient-to-r from-[#F3C2B0] to-[#FFF2DD]"
            >
              <Link href={`/detail/${imageData.id}`} className="absolute top-[30px] left-7">
                <Image
                  width={320}
                  height={480}
                  src={`${baseImgUrl}w220_and_h330_bestv2${imageData.poster_path}`}
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
              <div className="absolute bottom-0 left-0 right-0 h-[128px] bg-GreyScaleSilverGrey ">
                <div className="w-[680] body1_regular_suit">{imageData.overview}</div>
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
