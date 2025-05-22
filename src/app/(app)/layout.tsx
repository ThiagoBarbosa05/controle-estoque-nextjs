import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MenuMobile } from "@/components/sidebar/menu-mobile";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}

      <div className="flex flex-1">
        <Sidebar />

        <main className="p-5 bg-[#f7f7f7] flex md:ml-60 flex-col overflow-x-hidden flex-1">
          {children}
        </main>
      </div>
    </>
  );
}
