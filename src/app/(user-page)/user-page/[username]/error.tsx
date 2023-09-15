/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <div className="w-full h-[calc(100vh-370px)] flex justify-center items-center gap-8">
        <img src="/error.png" alt="error" />
        <h2>
          죄송합니다 <br />
          오류가 발생했습니다
        </h2>
        <button onClick={() => reset()}>다시 시도하기</button>
      </div>
    </main>
  );
}
