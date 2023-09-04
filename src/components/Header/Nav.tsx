import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <nav>
      <li className="flex">
        <ul>
          <Link href={''}>홈</Link>
        </ul>
        <ul>
          <Link href={''}>영화</Link>
        </ul>
        <ul>
          <Link href={''}>리뷰</Link>
        </ul>
        <ul>
          <Link href={''}>토론</Link>
        </ul>
      </li>
    </nav>
  );
};

export default Nav;
