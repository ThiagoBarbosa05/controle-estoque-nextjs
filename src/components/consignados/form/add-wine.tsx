import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

export function AddWine({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Adicionar vinhos</DialogTitle>
        <form action="">
          <div className="relative">
            <label htmlFor="wine">Vinhos*</label>

            <div className="relative">
              <Input
                id="wine"
                type="text"
                // onChange={(e) => handleSearchWine(e.target.value)}
                autoComplete="off"
                // defaultValue={searchParams.get("searchWine")?.toString()}
              />
              {/* {isPendingWine && (
              <div className="text-sm absolute bottom-1/2 right-4 translate-y-1/2 text-[#93173c] mt-1">
                <LoaderCircle className="size-5  animate-spin" />
              </div>
            )} */}
            </div>
            {/* {wines.length > 0 && (
            <ul
              className={twMerge(
                "border hidden shadow shadow-zinc-300 absolute mt-2 rounded max-h-52 overflow-y-auto right-0 left-0  flex-col z-10 bg-white",
                wines.length > 0 && "flex"
              )}
            >
              {wines.map((wine) => (
                <li
                  onClick={() =>
                    handleSelectWine({
                      id: wine.id,
                      name: wine.name,
                      price: wine.price,
                      quantity: 1,
                    })
                  }
                  key={wine.id}
                  className="px-4 not-last:border-b hover:bg-accent cursor-pointer py-2"
                >
                  {wine.name}
                </li>
              ))}
            </ul>
          )} */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
