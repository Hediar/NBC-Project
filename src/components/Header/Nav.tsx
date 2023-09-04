import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <nav>
      <li className="flex gap-8 body1_regular_suit">
        <ul>
          <Link className="transform ease-in-out duration-300 hover:translate-x-7 hover:text-yellow-400" href={'/'}>
            홈
          </Link>
        </ul>
        <ul>
          <Link
            className="transform ease-in-out duration-300 hover:scale-105 hover:text-purple-400"
            href={'/movielist'}
          >
            영화
          </Link>
        </ul>
        <ul>
          <Link className="transform ease-in-out duration-300 hover:scale-105 hover:text-blue-400" href={'/review'}>
            리뷰
          </Link>
        </ul>
        <ul>
          <Link
            className="transform ease-in-out duration-300 hover:scale-105 hover:text-orange-400"
            href={'/discussion/list/1'}
          >
            토론
          </Link>
        </ul>
      </li>
    </nav>
  );
};

export default Nav;
