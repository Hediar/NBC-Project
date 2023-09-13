import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type ReturnType = {
  userExist: boolean;
};

const doesUserExist = async (pageUsername: string): Promise<ReturnType> => {
  const supabase = createClientComponentClient<Database>();

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

export default doesUserExist;
