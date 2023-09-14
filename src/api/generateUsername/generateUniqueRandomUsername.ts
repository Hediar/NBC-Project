import { SupabaseClient } from '@supabase/supabase-js';
import generateRandomUsername from './generateRandomUsername';
import isUsernameAvailable from './isUsernameAvailable';

const generateUniqueRandomUsername = async (supabase: SupabaseClient<Database>) => {
  let randomUsername = await generateRandomUsername();
  while (!(await isUsernameAvailable(randomUsername, supabase))) {
    console.log('activated.');
    randomUsername = await generateRandomUsername();
  }
  return randomUsername;
};

export default generateUniqueRandomUsername;
