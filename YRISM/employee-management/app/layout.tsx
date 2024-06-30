import SonnerProvider from '@/provider/sonner-provider';
import cx from '@/utils/cx';
import type { Metadata } from 'next';
import { Exo } from 'next/font/google';
import './globals.css';

const exo = Exo({ subsets: ['vietnamese'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Employee Management',
  description: 'Employee Management By Thuan Pham',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cx(
          'font-sans antialiased min-h-screen relative isolate bg-grid-small-black/[0.2]',
          exo.variable
        )}
      >
        <div className="z-[-1] absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <SonnerProvider>{children}</SonnerProvider>
      </body>
    </html>
  );
}
