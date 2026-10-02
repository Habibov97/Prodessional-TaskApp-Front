import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'TaskApp',
    template: '%s | TaskApp',
  },
  description: 'Plan, prioritize and track your tasks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('h-full antialiased font-sans', inter.variable, geistMono.variable)}>
      <body className="min-h-full">
        {children}
        <Toaster position="top-right" theme="light" />
      </body>
    </html>
  );
}
