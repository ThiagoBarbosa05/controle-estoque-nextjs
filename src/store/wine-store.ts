
import {create} from "zustand"
import { persist } from "zustand/middleware"
import {v4} from "uuid"

type Wine = {
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
  createWine: (wine: Wine) => void
}

export const useWineStore = create<WineState>()(
  persist((set) => ({
    wine: [{
      id: v4(),
      name: "Estandon Brise Maritime Rosé 750mL",
      type: "Rosé",
      producer: "Provença",
      price: 89.90,
      country: "França",
      harvest: "2023"
    }],
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