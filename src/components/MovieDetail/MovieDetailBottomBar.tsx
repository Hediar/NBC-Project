'use client';
import React from 'react';
import { MovieData } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  movieId: string;
  movieData: MovieData;
};

const MovieDetailBottomBar = ({ movieId }: Props) => {
  const pathName = usePathname().split('/')[3];
  const tags = [
    { name: '주요정보', url: 'main' },
    { name: '출연/제작', url: 'crew' },
    { name: '영상/포토', url: 'trailer' },
    { name: '평점', url: 'rating' },
    { name: '토론', url: 'discussion' }
  ];

  return (
    <nav>
      <ul className="flex gap-7 p-3 mb-5">
        {tags.map((tag, idx) => {
          return (
            <li key={idx}>
              <Link href={`/detail/${movieId}/${tag.url}`}>
                {tag.url === pathName ? (
                  <strong className="pb-2 border-b-2 border-black">{tag.name}</strong>
                ) : (
                  <p className="pb-2 h:border-b-2 border-gray">{tag.name}</p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MovieDetailBottomBar;
