'use client';

import SearchMovies from './SearchMovies';
import MyMovies from './MyMovies';
import Modal from '../common/Modal';
import { useSearchModalStore } from '@/store/useReviewStore';

const SearchPopup = () => {
  const { closeSearchModal } = useSearchModalStore();

  return (
    <Modal>
      <h2>리뷰 작성</h2>
      <button onClick={() => closeSearchModal()}>닫기</button>
      <SearchMovies />
      <MyMovies />
    </Modal>
  );
};

export default SearchPopup;
