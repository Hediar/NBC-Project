import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <nav className="hidden md:block">
      <li className="flex gap-8 body1_regular_suit">
        <ul>
          <Link className="hover:font-semibold animate-200 hover:text-yellow-400" href={'/'}>
            홈
          </Link>
        </ul>
        <ul>
          <Link className="hover:font-semibold animate-200 hover:text-purple-400" href={'/movielist'}>
            영화
          </Link>
        </ul>
        <ul>
          <Link className="hover:font-semibold animate-200 hover:text-blue-400" href={'/review'}>
            리뷰
          </Link>
        </ul>
        <ul>
          <Link className="hover:font-semibold animate-200 hover:text-orange-400" href={'/discussion/list'}>
            토론
          </Link>
        </ul>
      </li>
    </nav>
  );
};

export default Nav;
