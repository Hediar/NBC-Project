import { SupabaseClient } from '@supabase/supabase-js';

type Params = {
  supabase: SupabaseClient;
  userId: string;
  columName: 'watch_later' | 'movielikes' | 'reviews' | 'discussion_post';
  value: boolean;
};
const toggleIsPublicData = async (
  supabase: Params['supabase'],
  userId: Params['userId'],
  columnName: Params['columName'],
  value: Params['value']
) => {
  const { error } = await supabase
    .from('is_public')
    .update({ [columnName]: value })
    .eq('user_id', userId);

  if (error) {
    return { isError: true, isSuccess: false };
  } else {
    return { isError: false, isSuccess: true };
  }
};

export default toggleIsPublicData;
