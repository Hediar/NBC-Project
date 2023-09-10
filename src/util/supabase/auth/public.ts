import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { cache } from 'react';

type GetTargetType = 'id to username' | 'username to id' | 'liked movies';
type FindTargetType = 'find database';

type FindParamsType = {
  database: string;
  select: string;
  eq: { key: string; value: unknown };
  single: boolean;
};

interface GetReturnType {
  username: Database['public']['Tables']['users']['Row']['username'] | null;
  id: Database['public']['Tables']['users']['Row']['id'] | null;
  likedMovies: string[] | null;
}

const publicApi = {
  get: cache(
    async <T extends GetTargetType>(
      target: T,
      params: T extends 'id to username' ? { id: string } : T extends 'username to id' ? { username: string } : never
    ): Promise<GetReturnType> => {
      const supabase = createClientComponentClient<Database>();
      const id = 'id' in params ? params.id : '';
      const username = 'username' in params ? params.username : '';

      const userIdToUsername = async (id: string): Promise<Pick<GetReturnType, 'username'>> => {
        try {
          const { data, error } = await supabase.from('users').select('username').eq('id', id).single();
          if (error) {
            return { username: null } as GetReturnType;
          } else {
            return { username: data.username } as GetReturnType;
          }
        } catch (error) {
          return { username: null } as GetReturnType;
        }
      };

      const usernameToId = async (username: string): Promise<GetReturnType> => {
        try {
          const { data, error } = await supabase.from('users').select('id').eq('username', username).single();
          if (error) {
            return { id: null } as GetReturnType;
          } else {
            return { id: data.id } as GetReturnType;
          }
        } catch (error) {
          return { id: null } as GetReturnType;
        }
      };

      const likedMovies = async (id: string): Promise<GetReturnType> => {
        try {
          const { data, error } = await supabase.from('movielikes').select('movieid').contains('user_id', [id]);
          if (error) {
            return { likedMovies: null } as GetReturnType;
          } else {
            const likedMovies = data!.map((el) => el.movieid);
            return { likedMovies } as GetReturnType;
          }
        } catch (error) {
          return { likedMovies: null } as GetReturnType;
        }
      };

      if (target === 'id to username') return (await userIdToUsername(id)) as GetReturnType;
      if (target === 'username to id') return (await usernameToId(username)) as GetReturnType;
      if (target === 'liked movies') return (await likedMovies(id)) as GetReturnType;

      return { username: null } as GetReturnType;
    }
  ),
  find: cache(async (target: FindTargetType, { database, select, eq: { key, value }, single }: FindParamsType) => {
    const supabase = createClientComponentClient();

    const selectData = async () => {
      let supabaseDatabaseFunction;
      if (single) supabaseDatabaseFunction = supabase.from(database).select(select).eq(key, value).single();
      if (!single) supabaseDatabaseFunction = supabase.from(database).select(select).eq(key, value);
      try {
        const { data, error } = (await supabaseDatabaseFunction) as { data: any; error: any };

        if (error) {
          return { data: null, error: error.message };
        } else {
          return { data: data, error: null };
        }
      } catch (error) {
        return { data: null, error: error };
      }
    };

    if (target === 'find database') return await selectData();
    else return { data: null, error: null };
  })
};

export default publicApi;
