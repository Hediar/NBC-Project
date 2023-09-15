import React from 'react';
import ResetPassword from './resetPassword';
import { redirect } from 'next/navigation';

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
    <>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
