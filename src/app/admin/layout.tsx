import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Butt Bricks',
  robots: { index: false, follow: false },
};

/** Admin module shell: no public Header/Footer. The dashboard layout adds the sidebar. */
export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
