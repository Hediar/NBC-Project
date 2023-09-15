'use client';

import { useSearchParams } from 'next/navigation';

function Message() {
  const params = useSearchParams();
  const errorMessage = params.get('error');
  const successMessage = params.get('success');

  return (
    <div>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      {successMessage && <span className="text-blue-500">{successMessage}</span>}
    </div>
  );
}

export default Message;
