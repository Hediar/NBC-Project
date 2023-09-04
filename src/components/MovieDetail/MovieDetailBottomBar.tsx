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
    { name: '토론', url: 'discussion' }
    // { name: '리뷰', url: 'review' },
  ];

  return (
    <nav>
      <ul className="flex gap-7 p-3 h-10 mb-10">
        {tags.map((tag, idx) => {
          return (
            <li key={idx}>
              <Link href={`/detail/${movieId}/${tag.url}`}>
                {tag.url === pathName ? (
                  <strong className="pb-2 border-b-2 border-black">{tag.name}</strong>
                ) : (
                  <p className="pb-2 hover:border-b border-gray-700">{tag.name}</p>
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
