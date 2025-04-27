import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="p-5 mt-6 overflow-x-hidden flex-1">{children}</main>;
      </div>
    </div>
  );
}
