'use client';

import SearchMovies from './SearchMovies';
import MyMovies from './MyMovies';
import { useSearchModalStore } from '@/store/useReviewStore';
import { Modal } from 'antd';
import { useState } from 'react';

const SearchPopup = () => {
  const { isSearchModalOpen, closeSearchModal } = useSearchModalStore();
  const [isSearchStart, setIsSearchStart] = useState(false);

  return (
    <>
      <Modal title="리뷰 작성" open={isSearchModalOpen} onCancel={closeSearchModal} footer={null} width={1240}>
        <div className="px-0 py-5 sm:px-5">
          <SearchMovies isSearchStart={isSearchStart} setIsSearchStart={setIsSearchStart} />
          <MyMovies isSearchStart={isSearchStart} />
        </div>
      </Modal>
    </>
  );
};

export default SearchPopup;
