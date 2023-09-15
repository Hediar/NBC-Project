import { SupabaseClient } from '@supabase/supabase-js';

const getUserIsPublicData = async (supabase: SupabaseClient, userId: string) => {
  const { data: userIsPublicData, error } = await supabase.from('is_public').select().eq('user_id', userId).single();
  if (error) {
    const { data: newlyInsertedData, error: insertError } = await supabase
      .from('is_public')
      .insert({ user_id: userId })
      .select()
      .single();

    if (insertError) {
      return;
    }
    return newlyInsertedData;
  }
  return userIsPublicData;
};

export default getUserIsPublicData;
