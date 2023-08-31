'use client';

import SearchMovies from './SearchMovies';
import MyMovies from './MyMovies';
import Modal from '../common/Modal';
import { useSearchModalStore } from '@/store/useReviewStore';

const SearchPopup = () => {
  const { closeSearchModal } = useSearchModalStore();

  return (
    <Modal>
      <div className="max-w-full w-[1024px]  p-3">
        <div className="flex justify-between py-3">
          <h2>리뷰 작성</h2>
          <button onClick={() => closeSearchModal()}>닫기</button>
        </div>
        <SearchMovies />
        <MyMovies />
      </div>
    </Modal>
  );
};

export default SearchPopup;
