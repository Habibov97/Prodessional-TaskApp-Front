import BgAuth from '@/assets/img/bg-auth.png';
import ServerStatus from '@/components/ServerStatus';
import ThemeToggle from '@/components/ThemeToggle';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-red-500/90 bg-cover bg-center p-4 sm:p-8"
      style={{ backgroundImage: `url(${BgAuth.src})` }}
    >
      <ThemeToggle className="fixed top-4 right-4 shadow-md" />
      {children}
      <ServerStatus />
    </div>
  );
}
