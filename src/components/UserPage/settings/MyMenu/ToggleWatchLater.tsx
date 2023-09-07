'use client';

import { Switch } from 'antd';
import React, { useState } from 'react';

type Props = {
  isPublic: boolean;
};

const ToggleWatchLater = ({ isPublic }: Props) => {
  const [isWatchLaterPublic, setIsWatchLaterPublic] = useState<boolean>(isPublic);

  const watchLaterOnChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="w-64 h-12 px-3 py-2 bg-neutral-50 rounded-xl border border-gray-200 justify-between items-center gap-5 inline-flex">
      <p className="text-neutral-800 text-sm">찜 목록</p>
      <Switch checked={isWatchLaterPublic} onChange={watchLaterOnChange} />
    </div>
  );
};

export default ToggleWatchLater;
