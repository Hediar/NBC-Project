import supabase from '@/supabase/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useMovieLikesMutation(movieId: number, userInfoId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation(
    async () => {
      const { data: likesTable } = await supabase.from('movielikes').select('*').eq('movieid', movieId);

      if (likesTable?.length) {
        const users = likesTable[0].user_id;

        const newUsers = users.includes(userInfoId)
          ? users.filter((id: string) => id !== userInfoId)
          : [...users, userInfoId];

        await supabase.from('movielikes').update({ user_id: newUsers }).eq('movieid', movieId);
      } else {
        const newUsers = { movieid: movieId, user_id: [userInfoId] };
        await supabase.from('movielikes').insert(newUsers);
      }
    },
    {
      // Success: Invalidate query and refresh the page
      onSuccess: () => {
        queryClient.invalidateQueries(['movieLikes', movieId]);
        router.refresh();
      }
    }
  );

  return mutation;
}
