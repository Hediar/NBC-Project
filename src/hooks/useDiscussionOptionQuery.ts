import { getDiscussionPostOption, addDiscussionOptionVote, revoteDiscussionOption } from '@/api/supabase-discussion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const useDiscussionOptionQuery = (postId: number) => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(['discussion_option', postId], () => getDiscussionPostOption(postId));

  const addVoteMutation = useMutation(addDiscussionOptionVote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['discussion_option', postId]);
    }
  });

  const revoteMutation = useMutation(revoteDiscussionOption, {
    onSuccess: () => {
      queryClient.invalidateQueries(['discussion_option', postId]);
    }
  });

  return { isLoading, isError, data, addVoteMutation, revoteMutation };
};

export default useDiscussionOptionQuery;
