
import {create} from "zustand"
import { persist } from "zustand/middleware"
import {v4} from "uuid"

export type Wine = {
  id?: string
  name: string
  harvest?: string
  type: string
  price: number | string
  country?: string
  producer?: string
}

type WineState = {
  wine: Wine[]
  isOpenForm: boolean
  openForm: () => void
  closeForm: () => void
  createWine: (wine: Wine) => void
}

export const useWineStore = create<WineState>()(
  persist((set) => ({
    wine: [
      {
      id: v4(),
      name: "Estandon Brise Maritime Rosé 750mL",
      type: "Rosé",
      producer: "Provença",
      price: 89.90,
      country: "França",
      harvest: "2023"
    },
    {
      id: v4(),
      name: "Cobos Felino Cabernet Sauvignon 750mL",
      type: "Tinto",
      producer: "Viña Cobos",
      price: 165.90,
      country: "Argentina",
      harvest: "2022"
    },
    {
      id: v4(),
      name: "Domaine Lafage Nicolas Côtes Catalanes IGP 750mL",
      type: "Tinto",
      producer: "Domaine Lafage",
      price: 312.72,
      country: "França",
      harvest: "2021"
    },
    {
      id: v4(),
      name: "Xavier Vignon Rosé Côtes du Rhône AOP",
      type: "Rosé",
      producer: "Xavier Vignon",
      price: 157.90,
      country: "França",
      harvest: "2023"
    },
    {
      id: v4(),
      name: "Espumante Victoria Geisse Extra Brut Vintage",
      type: "Espumante",
      producer: "Cave Geisse",
      price: 144.90,
      country: "Brasil",
      harvest: "2017"
    }
  ],
    isOpenForm: false,
    openForm: () => {
      set(() => ({
        isOpenForm: true
      }))
    },
    closeForm: () => {
      set(() => ({
        isOpenForm: false
      }))
    },
    createWine: (wine) => {
      set((state) => ({
        wine: [...state.wine, {...wine, price: wine.price, id: v4()}]
      }))
    }
  }
    ), {
    name: "wine-storage",
    partialize: (state) => ({
      wine: state.wine
    })
    } 
  )
)