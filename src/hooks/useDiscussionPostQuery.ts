import { deleteDiscussionPost, getDiscussionPost, updateDiscussionPost } from '@/api/supabase-discussion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useDiscussionPostQuery = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(['discussion_post'], getDiscussionPost);

  const updatePostMutation = useMutation(updateDiscussionPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['discussion_post']);
    }
  });
  const deletePostMutation = useMutation(deleteDiscussionPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['discussion_post']);
    }
  });

  return { isLoading, isError, data, deletePostMutation, updatePostMutation };
};

export default useDiscussionPostQuery;
