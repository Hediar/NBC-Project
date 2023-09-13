'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  movieId: string;
  movieData: MovieDetailData;
}

const navP = 'text-xs py-4 sm:sm:text-[20px] sm:leading-[24px] z-10';

const MovieDetailBottomBar = ({ movieId }: Props) => {
  const pathName = usePathname().split('/')[3] ?? '';

  const tags = [
    { name: '주요정보', url: '' },
    { name: '출연/제작', url: 'crew' },
    { name: '영상/포토', url: 'trailer' },
    { name: '토론', url: 'discussion' }
  ];

  return (
    <nav className="mb-10 relative">
      <ul className="flex gap-7" style={{ width: '80%', margin: '0 auto' }}>
        {tags.map((tag, idx) => {
          return (
            <li key={idx}>
              <Link href={`/detail/${movieId}/${tag.url}`}>
                {tag.url === pathName ? (
                  <p className={`${navP} font-bold border-b-2 border-black`}>{tag.name}</p>
                ) : (
                  <p className={`${navP} hover:border-b-2 border-gray-700`}>{tag.name}</p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="w-full bottom-[1px] -z-10 absolute border-b border-gray-300"></div>
    </nav>
  );
};

export default MovieDetailBottomBar;
