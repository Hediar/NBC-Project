'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  movieId: string;
  movieData: MovieData;
}

const MovieDetailBottomBar = ({ movieId }: Props) => {
  const pathName = usePathname().split('/')[3];
  const tags = [
    { name: '주요정보', url: 'main' },
    { name: '출연/제작', url: 'crew' },
    { name: '영상/포토', url: 'trailer' },
    { name: '토론', url: 'discussion' },
    { name: '리뷰', url: 'review' }
  ];

  return (
    <nav className="mb-10 relative">
      <ul className="flex gap-7">
        {tags.map((tag, idx) => {
          return (
            <li key={idx}>
              <Link href={`/detail/${movieId}/${tag.url}`}>
                {tag.url === pathName ? (
                  <p className="py-4 border-b-2 border-black font-bold z-10">{tag.name}</p>
                ) : (
                  <p className="py-4 hover:border-b-2 border-gray-700 z-10">{tag.name}</p>
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
