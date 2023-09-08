/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {
  handleOAuthSignIn: (provider: 'google' | 'kakao', queryParams?: {}) => Promise<void>;
};

const Google = ({ handleOAuthSignIn }: Props) => (
  <div
    className="animate-300 hover:scale-105 cursor-pointer w-12 h-12 flex justify-center items-center rounded-full overflow-hidden border border-[#ebebeb]"
    style={{ background: '#fbfbfb' }}
    onClick={() => handleOAuthSignIn('google', { access_type: 'offline', prompt: 'consent' })}
  >
    <img className="w-10 h-10 " src="/google.png" alt="google" />
  </div>
);

export default Google;
