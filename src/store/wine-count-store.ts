import { create } from "zustand";
import { persist } from "zustand/middleware";

type WineCountState = {
  quantities: { [wineId: string]: number };
  setQuantity: (id: string, quantity: number) => void;
};

export const useWineCountStore = create<WineCountState>()(
  persist(
    (set) => ({
      quantities: {},
      setQuantity: (id, quantity) => {
        set((state) => ({
          quantities: { ...state.quantities, [id]: quantity },
        }));
      },
    }),
    {
      name: "wine-count-storage",
      partialize: (state) => ({
        quantities: state.quantities,
      }),
    }
  )
);
