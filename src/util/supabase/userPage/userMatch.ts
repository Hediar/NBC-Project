import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

type ReturnType = {
  userExist: boolean;
};

const userMatch = async (pageUsername: string): Promise<ReturnType> => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const { data: username } = await supabase.from('users').select('username').eq('username', pageUsername).single();
    if (!username) {
      return { userExist: false };
    } else {
      return { userExist: true };
    }
  } catch (error) {
    return { userExist: false };
  }
};

export default userMatch;
