'use client';

import SearchMovies from './SearchMovies';
import MyMovies from './MyMovies';
import { useSearchModalStore } from '@/store/useReviewStore';
import { Modal } from 'antd';

const SearchPopup = () => {
  const { isSearchModalOpen, closeSearchModal } = useSearchModalStore();

  return (
    <>
      <Modal title="리뷰 작성" open={isSearchModalOpen} onCancel={closeSearchModal} footer={null} width={1540}>
        <div className='p-5'>
          <SearchMovies />
          <MyMovies />
        </div>
      </Modal>
    </>
  );
};

export default SearchPopup;
