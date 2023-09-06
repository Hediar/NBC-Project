import { deleteDiscussionPost, getDiscussionPost, updateDiscussionPost } from '@/api/supabase-discussion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useDiscussionPostQuery = (page: string) => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(['discussion_post', page], getDiscussionPost);

  const updatePostMutation = useMutation(updateDiscussionPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['discussion_option', 170]);
    }
  });
  const deletePostMutation = useMutation(deleteDiscussionPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['discussion_post', page]);
    }
  });

  return { isLoading, isError, data, deletePostMutation, updatePostMutation };
};

export default useDiscussionPostQuery;
