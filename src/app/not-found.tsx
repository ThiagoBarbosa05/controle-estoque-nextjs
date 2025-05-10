import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#93173c] w-full min-h-screen flex flex-col gap-5 items-center justify-center">
      <strong className="text-white text-5xl underline">404</strong>
      <h2 className="text-6xl font-bold text-white">Not Found</h2>
      <p className="text-white">
        Não foi possível encontrar a página solicitada.
      </p>
      <Link
        className="bg-white flex items-center gap-2 rounded-md py-1.5 px-3 text-[#93173c] font-medium text-sm"
        href="/"
      >
        <ArrowLeft className="size-4" />
        Retornar a página inicial
      </Link>
    </div>
  );
}
