import saveUserProviderWithEmail from '@/api/supabase/saveUserProviderWithEmail';
import authApi from '@/util/supabase/auth/auth';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const { userData } = await authApi.get('userData');
    if (!userData) {
      return NextResponse.json({ userData: null });
    } else {
      await saveUserProviderWithEmail();
      return NextResponse.json({ userData });
    }
  } catch (error) {
    return NextResponse.json({ userData: null });
  }
};
