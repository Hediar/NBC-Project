import { Session, SupabaseClient } from '@supabase/supabase-js';

const saveUserProviderIfNotSaved = async (session: Session, supabase: SupabaseClient) => {
  const providerFromMeta = session.user.app_metadata.provider;
  const emailFromMeta = session.user.email;

  const { data: publicUsersProviderData, error } = await supabase
    .from('users')
    .select('provider, email')
    .eq('id', session.user.id)
    .single();

  // 유저 로그인 시에 provider가 안 되어 있으면 저장하기
  if (!publicUsersProviderData!.provider || !publicUsersProviderData!.email) {
    await supabase.from('users').update({ provider: providerFromMeta, email: emailFromMeta }).eq('id', session.user.id);
  }
};

export default saveUserProviderIfNotSaved;
