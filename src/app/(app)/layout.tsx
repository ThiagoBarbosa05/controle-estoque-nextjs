export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="p-5 mt-6 overflow-x-hidden flex-1">{children}</main>;
}
