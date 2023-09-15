import { cookies } from 'next/headers';
import { type Session, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cache } from 'react';

type ParamType = 'session' | 'userData' | 'userId';

interface TypeOfReturn {
  session: Session | null;
  userData: Database['public']['Tables']['users']['Row'] | null;
  userId: Session['user']['id'] | null;
}

const authApi = {
  get: cache(async (target: ParamType): Promise<TypeOfReturn> => {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const getSession = async (): Promise<Pick<TypeOfReturn, 'session'>> => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return { session: null };
      } else {
        return { session: data.session };
      }
    };

    const getUserData = async (): Promise<Pick<TypeOfReturn, 'userData'>> => {
      try {
        const { session } = await getSession();
        if (!session) return { userData: null };
        const signedInUserId = session!.user.id;

        const { data: userData } = await supabase.from('users').select().eq('id', signedInUserId).single();

        return { userData };
      } catch (error) {
        return { userData: null };
      }
    };

    const getUserId = async (): Promise<Pick<TypeOfReturn, 'userId'>> => {
      try {
        const { session } = await getSession();
        if (!session) {
          return { userId: null };
        } else {
          return { userId: session.user.id };
        }
      } catch (error) {
        return { userId: null };
      }
    };

    if (target === 'session') return (await getSession()) as TypeOfReturn;
    if (target === 'userData') return (await getUserData()) as TypeOfReturn;
    if (target === 'userId') return (await getUserId()) as TypeOfReturn;

    return { session: null } as TypeOfReturn;
  })
};

export default authApi;
