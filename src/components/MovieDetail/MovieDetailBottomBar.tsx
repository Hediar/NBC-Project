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
      <ul className="flex gap-7 py-5 pb-5">
        {tags.map((tag, idx) => {
          return (
            <li key={idx}>
              <Link href={`/detail/${movieId}/${tag.url}`}>
                {tag.url === pathName ? <strong>{tag.name}</strong> : <p>{tag.name}</p>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MovieDetailBottomBar;
