import supabase from '@/supabase/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useReviewLikesMutation(
  reviewId: string,
  userInfoId: string,
  likecurrentuser: boolean,
  setLikecurrentuser: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation(
    async () => {
      const { data: likesTable } = await supabase.from('reviewlikes').select('*').eq('reviewid', reviewId);

      if (likesTable?.length) {
        const users = likesTable[0].user_id;

        const newUsers = users.includes(userInfoId)
          ? users.filter((id: string) => id !== userInfoId)
          : [...users, userInfoId];

        await supabase
          .from('reviewlikes')
          .update({ user_id: newUsers, count: newUsers.length })
          .eq('reviewid', reviewId);
        setLikecurrentuser(!likecurrentuser);
      } else {
        const newUsers = { reviewid: reviewId, user_id: [userInfoId], count: 1 };
        await supabase.from('reviewlikes').insert(newUsers);
        setLikecurrentuser(!likecurrentuser);
      }
    },
    {
      // Success: Invalidate query and refresh the page
      onSuccess: () => {
        queryClient.invalidateQueries(['reviewLikes', reviewId]);
      }
    }
  );

  return mutation;
}
