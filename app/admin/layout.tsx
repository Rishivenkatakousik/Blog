import { AdminSidebar } from "./components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 md:ml-64">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
