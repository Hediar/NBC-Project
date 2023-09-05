import { SupabaseClient } from '@supabase/supabase-js';

const doesUsersMatch = async (supabase: SupabaseClient, username: string): Promise<boolean> => {
  const { data: signedInUserData, error: userNotSignedIn } = await supabase.auth.getUser();

  if (userNotSignedIn) {
    return false;
  }
  const signedInUserId = signedInUserData.user.id;
  const { data: publicUserData } = await supabase.from('users').select('username').eq('id', signedInUserId).single();
  const signedInUsername = publicUserData!.username;

  if (username === signedInUsername) {
    return true;
  } else {
    return false;
  }
};

export default doesUsersMatch;
