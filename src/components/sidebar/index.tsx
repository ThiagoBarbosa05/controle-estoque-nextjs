import { Navigation } from "./navigation";

export function Sidebar() {
  return (
    <aside className="bg-[#f7f7f7] hidden md:block min-w-[200px]: lg:min-w-[300px] p-5 border border-zinc-200">
      <Navigation />
    </aside>
  );
}
