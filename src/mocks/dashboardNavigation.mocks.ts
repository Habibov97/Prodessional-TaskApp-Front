import { DashBoardNavItem } from '@/types/dashboard-nav-mocks.types';
import { MdDashboard } from 'react-icons/md';
import { FaExclamation } from 'react-icons/fa';
import { MdTask } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';
import { MdOutlineHelp } from 'react-icons/md';
import { MdOutlineLogout } from 'react-icons/md';

export const dashboardNavMocks: DashBoardNavItem[] = [
  { id: 1, key: 'dashboard', href: '/dashboard', icon: MdDashboard, title: 'Dashboard' },
  { id: 2, key: 'vitaltask', href: '/dashboard/vitaltask', icon: FaExclamation, title: 'Vital Task' },
  { id: 3, key: 'mytask', href: '/dashboard/mytask', icon: MdTask, title: 'My Task' },
  { id: 4, key: 'taskcategories', href: '/dashboard/taskcategories', icon: FaTasks, title: 'Task Categories' },
  { id: 5, key: 'settings', href: '/dashboard/settings', icon: MdOutlineSettings, title: 'Settings' },
  { id: 6, key: 'help', href: '/dashboard/help', icon: MdOutlineHelp, title: 'Help' },
  { id: 7, key: 'logout', href: '/logout', icon: MdOutlineLogout, title: 'Logout' },
];
