'use client';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// The login and register pages sit on a fixed red illustration that only
// works in light mode, so they ignore the saved theme without changing it.
const LIGHT_ONLY_PATHS = ['/login', '/register'];

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const forcedTheme = LIGHT_ONLY_PATHS.includes(pathname) ? 'light' : undefined;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      forcedTheme={forcedTheme}
    >
      {children}
    </NextThemesProvider>
  );
}
