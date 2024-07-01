'use client';

import { useEffect } from 'react';

const Page500 = () => {
  useEffect(() => {}, []);

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-bold">
          Some thing went wrong!, reload page please
        </p>
        <button
          className="btn text-sm"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default Page500;
