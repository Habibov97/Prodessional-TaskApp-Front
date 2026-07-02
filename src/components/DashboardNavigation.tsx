'use client';

import Link from 'next/link';
import { dashboardNavMocks } from '../mocks/dashboardNavigation.mocks';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/actions/auth.actions';

export default function DashboardNavigation() {
  const pathName = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    localStorage.removeItem('accessToken');
    router.replace('/login');
  }

  return (
    <header className="px-[21px] pb-[31px] bg-red-500/90 text-white rounded-r-md rounded-br-md shadow-mist-500 max-w-[300px] min-w-[280px] w-full ">
      <nav className="relative flex flex-col items-center justify-center ">
        <div className="absolute w-[100px] h-[100px] rounded-full overflow-hidden bg-stone-400 top-[-50px] left-1/2 -translate-x-1/2 ">
          {/* <img style={{ background: '' }} src="" alt="" /> */}
        </div>
        <div className="mt-[60px] mb-[30px] text-center">
          <p className="font-bold">Tahira Habibova</p>
          <p>tahirahabibova@gmail.com</p>
        </div>
        <div className="flex flex-col justify-between min-h-[60dvh]">
          <div className="flex flex-col gap-3">
            {dashboardNavMocks?.map((item) => {
              const Icon = item.icon;
              if (item.key === 'logout') return;
              return (
                <Link
                  href={item.href}
                  key={item.id}
                  className={`flex items-center gap-3 py-[15px] px-[30px] rounded-xl ${pathName === item.href ? 'bg-white text-red-500' : ''} `}
                >
                  <Icon size={25} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
          <div>
            {dashboardNavMocks
              ?.filter((item) => item.key === 'logout')
              .map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={handleLogout}
                    className={`flex items-center gap-3 py-[15px] px-[30px] rounded-xl cursor-pointer`}
                  >
                    <Icon size={25} />
                    <span>{item.title}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </nav>
    </header>
  );
}
