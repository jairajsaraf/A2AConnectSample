import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      {/* Main content area with padding for fixed sidebar and topbar */}
      <main className="ml-64 pt-16 p-8">
        {children}
      </main>
    </div>
  );
}
