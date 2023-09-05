import { SupabaseClient } from '@supabase/supabase-js';

const getWatchedMoviesList = async (userId: string, supabase: SupabaseClient): Promise<string[]> => {
  const { data: watchedMovieList, error } = await supabase
    .from('users')
    .select('watched_movies')
    .eq('id', userId)
    .single();

  if (error) {
    return [];
  }
  return watchedMovieList!.watched_movies;
};

export default getWatchedMoviesList;
