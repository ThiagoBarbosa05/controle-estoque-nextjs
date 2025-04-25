
import {create} from "zustand"
import { persist } from "zustand/middleware"
import {v4} from "uuid"
import {format} from 'date-fns'

export type Consigned = {
  id?: string
  customerId: string
  customerName: string
  wines: {
    id: string
    name: string
    quantity: number
  }[],
  createdAt?: Date | string
  updatedAt?: Date | string
}

type ConsignedState = {
  consigned: Consigned[]
  isOpenForm: boolean
  openForm: () => void
  closeForm: () => void
  createConsigned: (consigned: Consigned) => void
}

export const useConsignedStore = create<ConsignedState>()(
  persist((set) => ({
    consigned: [
     
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
    createConsigned: (consigned) => {
      set((state) => ({
       consigned: [...state.consigned, {...consigned, id: v4(), createdAt: format(new Date(), 'dd/MM/yyyy'), updatedAt: format(new Date(), 'dd/MM/yyyy')}]
      }))
    }
  }
    ), {
    name: "consigned-storage",
    partialize: (state) => ({
      consigned: state.consigned
    })
    } 
  )
)