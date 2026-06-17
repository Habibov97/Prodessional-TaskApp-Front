import { IconType } from 'react-icons';

export type DashboardNavKey = 'dashboard' | 'vitaltask' | 'mytask' | 'taskcategories' | 'settings' | 'help' | 'logout';

export interface DashBoardNavItem {
  id: number;
  key: DashboardNavKey;
  icon: IconType;
  title: string;
  href: string;
}
