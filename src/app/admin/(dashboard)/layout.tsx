import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth/session';
import { AdminShell } from '@/components/admin/AdminShell/AdminShell';

/**
 * Every page under (dashboard) requires a verified admin session.
 * Reading cookies here also makes these routes dynamic (never prerendered).
 */
export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await verifySession();
  if (!session) redirect('/admin/login');

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
