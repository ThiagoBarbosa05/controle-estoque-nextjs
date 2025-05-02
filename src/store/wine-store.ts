import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Wine = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type WineState = {
  wine: Wine[];
  isOpenForm: boolean;
  openForm: () => void;
  closeForm: () => void;
  createWine: (wine: Wine) => void;
  deleteWine: (id: string) => void;
  reset: () => void;
};

export const useWineStore = create<WineState>()(
  persist(
    (set) => ({
      wine: [],
      isOpenForm: false,
      openForm: () => {
        set(() => ({
          isOpenForm: true,
        }));
      },
      closeForm: () => {
        set(() => ({
          isOpenForm: false,
        }));
      },
      createWine: (wine) => {
        set((state) => ({
          wine: [...state.wine, { ...wine, price: wine.price }],
        }));
      },
      deleteWine: (id: string) => {
        set((state) => ({
          wine: state.wine.filter((w) => w.id !== id),
        }));
      },
      reset: () => set({ wine: [] }),
    }),
    {
      name: "wine-storage",
      partialize: (state) => ({
        wine: state.wine,
      }),
    }
  )
);
