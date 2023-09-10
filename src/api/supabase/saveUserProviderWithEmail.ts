import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cache } from 'react';
import { cookies } from 'next/headers';
import getSession from '../../util/supabase/auth/auth';

const saveUserProviderWithEmail = cache(async () => {
  try {
    const { session } = await getSession('session');
    if (!session) {
      return;
    } else {
      const supabase = createRouteHandlerClient({ cookies });
      const providerFromMeta = session.user.app_metadata.provider;
      const emailFromMeta = session.user.email;

      const { data: publicUsersProviderData, error } = await supabase
        .from('users')
        .select('provider, email')
        .eq('id', session.user.id)
        .single();

      if (!publicUsersProviderData!.provider || !publicUsersProviderData!.email) {
        await supabase
          .from('users')
          .update({ provider: providerFromMeta, email: emailFromMeta })
          .eq('id', session.user.id);
      }
    }
  } catch (error) {
    return;
  }
});

export default saveUserProviderWithEmail;
