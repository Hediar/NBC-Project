'use client';

import React from 'react';
import '../../styles/paging.css';

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  pageRangeDisplayed?: number;
};

const Paging = ({ currentPage, setCurrentPage, totalPages, pageRangeDisplayed = 7 }: Props) => {
  const pageRangeHalf = Math.floor(pageRangeDisplayed / 2);

  let pageNumbers: any[] = [];

  if (currentPage <= pageRangeHalf) {
    for (let i: number = 1; i <= pageRangeDisplayed; i++) {
      if (i < 1) continue;
      if (i > totalPages) break;

      pageNumbers.push(i);
    }
  } else if (currentPage > totalPages - pageRangeHalf) {
    for (let i: number = totalPages - pageRangeDisplayed + 1; i <= totalPages; i++) {
      if (i < 1) continue;
      if (i > totalPages) break;

      pageNumbers.push(i);
    }
  } else {
    for (let i: number = currentPage - pageRangeHalf; i <= currentPage + pageRangeHalf; i++) {
      if (i < 1) continue;
      if (i > totalPages) break;

      pageNumbers.push(i);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
      {currentPage - pageRangeHalf > 1 && currentPage > pageRangeDisplayed && (
        <>
          <button
            onClick={() => {
              setCurrentPage(currentPage - pageRangeDisplayed);
            }}
            title="이전"
          >
            {'<<'}
          </button>
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
          }}
          className={page === currentPage ? 'text-red-500 font-bold activeLink' : ''}
        >
          {page}
        </button>
      ))}

      {currentPage + pageRangeHalf < totalPages && currentPage > pageRangeDisplayed && (
        <>
          <button
            onClick={() => {
              setCurrentPage(currentPage + pageRangeDisplayed);
            }}
            title="다음"
          >
            {'>>'}
          </button>
        </>
      )}
    </div>
  );
};

export default Paging;
