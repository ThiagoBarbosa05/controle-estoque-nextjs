import { MenuMobile } from "../sidebar/menu-mobile";

export function Header() {
  return (
    <header className="w-full px-5 gap-6 bg-[#7e1e2a] flex items-center shadow-md shadow-zinc-400 justify-center">
      <MenuMobile />

      <h1 className="font-bold text-lg sm:text-2xl  flex-1 py-6 text-white">
        Controle de Estoque de Vinhos
      </h1>
    </header>
  );
}
