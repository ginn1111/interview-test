import { ReactNode } from 'react';
import { Toaster } from 'sonner';

const SonnerProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  );
};

export default SonnerProvider;
