import { SupabaseClient } from '@supabase/supabase-js';

type ReturnType = {
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
  data: string | null;
};

const idToUsername = async (supabase: SupabaseClient, username: string): Promise<ReturnType> => {
  const { data, error } = await supabase.from('users').select('id').eq('username', username).single();

  if (error) {
    return { isError: true, isSuccess: false, error: error.message, data: null };
  } else {
    return { isError: false, isSuccess: true, error: null, data: data.id };
  }
};

export default idToUsername;
