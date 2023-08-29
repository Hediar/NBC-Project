import supabase from '@/supabase/config';
// get요청
export const getDiscussionPost = async () => {
  const { data } = await supabase.from('discussion_post').select('*').order('post_id', { ascending: false });

  return data;
};

export const getDiscussionPostDetail = async (postId: number) => {
  try {
    const { data } = await supabase.from('discussion_post').select('*').eq('post_id', postId);

    const postData = data![0];
    return postData;
  } catch (error) {}
};

export const getDiscussionPostOption = async (postId: number) => {
  try {
    const { data } = await supabase.from('discussion_option').select('*').eq('post_id', postId).order('option_id');
    const { data: voteCountData } = await supabase.from('discussion_user').select('*').eq('post_id', postId);

    const optionData = data?.map((option) => {
      return { ...option, count: voteCountData?.filter((vote) => vote.option_id === option.option_id).length };
    });

    return optionData;
  } catch (error) {}
};

interface AddUserData {
  user_id: string;
  option_id: number;
  post_id: number;
}

export const addDiscussionOptionVote = async (userData: AddUserData) => {
  try {
    await supabase.from('discussion_user').insert(userData).select();
  } catch (error) {}
};

export const revoteDiscussionOption = async ({
  optionId,
  userId,
  userData
}: {
  optionId: number;
  userId: string;
  userData: AddUserData;
}) => {
  try {
    const { error } = await supabase.from('discussion_user').delete().eq('option_id', optionId).eq('user_id', userId);

    await addDiscussionOptionVote(userData);
  } catch (error) {
    // console.log(error.message)
  }
};
//update요청

interface UpdateDiscussionPost {
  userId: string;
  title: string | undefined;
  content: string | undefined;
  options: string[];
  postId: string;
  startNum: number;
}
export const updateDiscussionPost = async ({
  userId,
  title,
  content,
  options,
  postId,
  startNum
}: UpdateDiscussionPost) => {
  try {
    const newPost = {
      user_id: userId,
      title,
      content
    };
    const { data } = await supabase.from('discussion_post').update(newPost).eq('post_id', +postId).select();

    for (let i = startNum; i < options.length; i++) {
      const newOption = {
        post_id: data![0].post_id,
        content: options[i]
      };

      await supabase.from('discussion_option').insert(newOption).select();
    }
  } catch (error) {}
};
//delete요청
export const deleteDiscussionPost = async (postId: number) => {
  try {
    const { error: optionError } = await deleteDiscussionPostOptions(postId);
    const { error: postError } = await supabase.from('discussion_post').delete().eq('post_id', postId);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDiscussionPostOptions = async (postId: number) => {
  const { error } = await supabase.from('discussion_option').delete().eq('post_id', postId);

  return { error };
};
