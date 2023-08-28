import { deleteDiscussionPost, getDiscussionPost } from '@/api/supabase-discussion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useDiscussionPostQuery = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(['discussion_post'], getDiscussionPost);

  const deletePostMutation = useMutation(deleteDiscussionPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['discussion_post']);
    }
  });

  return { isLoading, isError, data, deletePostMutation };
};

export default useDiscussionPostQuery;
