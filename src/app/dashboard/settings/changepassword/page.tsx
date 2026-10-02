import type { Metadata } from 'next';
import ChangePasswordForm from '@/components/settings/ChangePasswordForm';

export const metadata: Metadata = {
  title: 'Change Password',
};

export default function ChangePassword() {
  return <ChangePasswordForm />;
}
