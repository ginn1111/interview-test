'use client';

import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-bold">Employee not found!</p>
        <button className="btn" onClick={() => router.replace('/')}>
          Go to home
        </button>
      </div>
    </div>
  );
};

export default Error;
