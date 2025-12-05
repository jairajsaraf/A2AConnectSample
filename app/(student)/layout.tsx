import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ChatbotFab from "./ChatbotFab";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <Sidebar />
      <Topbar />

      {/* Main content area with padding for fixed sidebar and topbar */}
      <main className="ml-64 pt-16 p-8 cmis-dashboard-bg min-h-screen">
        {children}
      </main>

      {/* Floating chatbot button */}
      <ChatbotFab />
    </div>
  );
}
