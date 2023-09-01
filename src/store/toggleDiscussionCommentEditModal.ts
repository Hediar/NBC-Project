import { create } from 'zustand';

interface ToggleDiscussionCommentEditModal {
  isDiscussionCommentEditModalOpen: boolean;
  postId?: string;
  setIsDiscussionCommentEditModalOpen: (isOpen: boolean, postId: string) => void;
}

const useToggleDiscussionCommentEditModal = create<ToggleDiscussionCommentEditModal>((set) => {
  return {
    isDiscussionCommentEditModalOpen: false,
    postId: '',
    setIsDiscussionCommentEditModalOpen: (isOpen: boolean, post_id?: string) => {
      if (post_id) {
        set({ isDiscussionCommentEditModalOpen: isOpen, postId: post_id });
      } else {
        set({ isDiscussionCommentEditModalOpen: isOpen });
      }
    }
  };
});

export default useToggleDiscussionCommentEditModal;
