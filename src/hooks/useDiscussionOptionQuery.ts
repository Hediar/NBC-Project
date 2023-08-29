import { getDiscussionPostOption, updateDiscussionOptionVote } from '@/api/supabase-discussion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const useDiscussionOptionQuery = (postId: number) => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(['discussion_option', postId], () => getDiscussionPostOption(postId));

  const updateVoteMutation = useMutation(updateDiscussionOptionVote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['discussion_option']);
    }
  });
  return { isLoading, isError, data, updateVoteMutation };
};

export default useDiscussionOptionQuery;
