import supabase from '@/supabase/config';
// get요청
export const getDiscussionPost = async () => {
  const { data } = await supabase.from('discussion_post').select('*').order('post_id', { ascending: false });

  return data;
};

export const getDiscussionPostDetail = async (postId: number): Promise<DiscussionPost | undefined> => {
  try {
    const { data } = await supabase.from('discussion_post').select('*').eq('post_id', postId);

    const postData: DiscussionPost = data![0];
    return postData;
  } catch (error) {}
};

export const getDiscussionPostOption = async (postId: number): Promise<DiscussionOption[] | undefined> => {
  try {
    const { data } = await supabase.from('discussion_option').select('*').eq('post_id', postId).order('option_id');

    const optionData: DiscussionOption[] = data!;
    return optionData;
  } catch (error) {}
};

//update요청
export const updateDiscussionOptionVote = async (selectedOption: DiscussionOption) => {
  try {
    await supabase
      .from('discussion_option')
      .update({ ...selectedOption, count: selectedOption.count + 1 })
      .eq('option_id', selectedOption.option_id);

    const userData = {
      user_id: 'eb7d86e0-5350-4487-999d-86321481f5dc',
      option_id: selectedOption.option_id
    };
    await supabase.from('discussion_user').insert(userData).select();
  } catch (error) {}
};

export const updateDiscussionPost = async () => {
  try {
  } catch (error) {}
};
//delete요청
export const deleteDiscussionPost = async (postId: number) => {
  try {
    const [{ error: postError }, { error: optionError }] = await Promise.all([
      supabase.from('discussion_post').delete().eq('post_id', postId),
      deleteDiscussionPostOptions(postId)
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDiscussionPostOptions = async (postId: number) => {
  const { error } = await supabase.from('discussion_option').delete().eq('post_id', postId);

  return { error };
};
