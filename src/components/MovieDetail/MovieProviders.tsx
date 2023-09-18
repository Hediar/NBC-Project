import { baseImgUrl } from '@/static/baseImgUrl';
import Image from 'next/image';

interface Props {
  data: MovieProvider[];
}

const MovieProviders = ({ data }: Props) => {
  return (
    <div className="flex gap-2">
      {data.map((provider: MovieProvider, idx: number) => {
        return (
          <div key={idx}>
            <Image
              src={`${baseImgUrl}w500/${provider.logo_path}`}
              alt=""
              width={60}
              height={60}
              quality={100}
              className="rounded-xl w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-auto lg:h-auto"
            />
          </div>
        );
      })}
    </div>
  );
};

export default MovieProviders;
