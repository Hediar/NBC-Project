import { SupabaseClient } from '@supabase/supabase-js';

const isUsernameAvailable = async (username: string, supabaseApi: SupabaseClient<Database>): Promise<boolean> => {
  const { data, error } = await supabaseApi.from('users').select('username');
  const isUsernameAlreadyOnDB = data!.some((item) => item.username === username) as boolean;
  return isUsernameAlreadyOnDB === true ? false : true;
};

export default isUsernameAvailable;
