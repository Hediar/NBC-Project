import supabase from '@/supabase/config';

const getLikes = async () => {
  const { data } = await supabase.from('movielikes').select('*');
  return data;
};

export { getLikes };
