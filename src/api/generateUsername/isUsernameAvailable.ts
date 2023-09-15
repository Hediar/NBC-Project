import { SupabaseClient } from '@supabase/supabase-js';

const isUsernameAvailable = async (username: string, supabaseApi: SupabaseClient<Database>): Promise<boolean> => {
  const { data, error } = await supabaseApi.from('users').select('username');
  console.log('data', data);
  console.log('error', error);
  const isUsernameAlreadyOnDB = data!.some((item) => item.username === username) as boolean;
  console.log(isUsernameAlreadyOnDB);
  return isUsernameAlreadyOnDB === true ? false : true;
};

export default isUsernameAvailable;
