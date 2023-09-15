import React, { Suspense } from 'react';
import ResetPassword from './resetPassword';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface Props {
  searchParams: { code: string };
}

export const dynamic = 'force-dynamic';

const ResetPasswordPage = ({ searchParams }: Props) => {
  const code = searchParams.code;

  if (!code || code.length < 10) {
    redirect(`${process.env.BASE_URL}`);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
