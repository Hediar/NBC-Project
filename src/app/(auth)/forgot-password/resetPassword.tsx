'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import ChangePasswordFromMail from './form';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const code: string | null = searchParams.get('code');

  const supabase = createClientComponentClient();
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (code && event == 'SIGNED_IN') {
        setShowForm(true);
      }
    });
  }, [code]);

  return <>{showForm && <ChangePasswordFromMail />}</>;
};

export default ResetPassword;
