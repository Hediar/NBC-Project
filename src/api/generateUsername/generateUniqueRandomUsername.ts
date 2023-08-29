import { SupabaseClient } from '@supabase/supabase-js';
import generateRandomUsername from './generateRandomUsername';
import isUsernameAvailable from './isUsernameAvailable';

// 중복 없는 닉네임 만들기
const generateUniqueRandomUsername = async (supabase: SupabaseClient<Database>) => {
  let randomUsername = await generateRandomUsername();
  while (!(await isUsernameAvailable(randomUsername, supabase))) {
    randomUsername = await generateRandomUsername();
  }
  return randomUsername;
};

export default generateUniqueRandomUsername;
