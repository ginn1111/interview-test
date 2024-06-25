import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <main className="container py-20">{children}</main>;
};

export default MainLayout;
