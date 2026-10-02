import ProfileForm from '@/components/settings/ProfileForm';
import { getMe } from '@/lib/api';

export default async function AccountInfo() {
  const user = await getMe();
  // Keyed on the saved values so the form shows fresh data after an update.
  return <ProfileForm key={`${user?.firstName}-${user?.lastName}-${user?.email}`} user={user} />;
}
