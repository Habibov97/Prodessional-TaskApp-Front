'use client';
import { useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet';
import DashboardNavigation from './DashboardNavigation';
import type { UserType } from '@/types/user.types';

export default function MobileNavigation({ user }: { user: UserType | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation"
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#333] hover:bg-stone-200 lg:hidden"
        >
          <HiOutlineMenuAlt2 className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-transparent text-white">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Dashboard pages and account actions</SheetDescription>
        <DashboardNavigation user={user} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
