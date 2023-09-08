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
    <div className='flex gap-1 justify-center mt-10'>
      {currentPage - pageRangeHalf > 1 && currentPage > pageRangeDisplayed && (
        <>
          <button
            onClick={() => {
              setCurrentPage(currentPage - pageRangeDisplayed);
            }}
            title="이전"
            className={`w-8 h-8 p-2.5 rounded-lg border border-gray-200 flex-col justify-center items-center gap-2.5 inline-flex text-sm font-normal leading-none bg-white text-neutral-800`}
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
          className={`w-8 h-8 p-2.5 rounded-lg border border-gray-200 flex-col justify-center items-center gap-2.5 inline-flex text-sm font-normal leading-none ${page === currentPage ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-800'}`}
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
            className={`w-8 h-8 p-2.5 rounded-lg border border-gray-200 flex-col justify-center items-center gap-2.5 inline-flex text-sm font-normal leading-none bg-white text-neutral-800`}
          >
            {'>>'}
          </button>
        </>
      )}
    </div>
  );
};

export default Paging;
