"use client"; // Error boundaries must be Client Components

import { CircleX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-screen flex gap-4 flex-col items-center justify-center">
      <h2 className="text-3xl">Ops! Algo deu errado.</h2>
      <CircleX className="size-28 text-zinc-300" />
      <Link
        className="py-3 px-4 cursor-pointer rounded-md bg-[#93173c] text-white text-sm leading-none"
        href="/dashboard"
      >
        Tentar de novo
      </Link>
    </div>
  );
}
