
import {create} from "zustand"
import { persist } from "zustand/middleware"
import {v4} from "uuid"

export type Customer = {
  id?: string
  document: string
  contact?: string
  email?: string
  phone?: string
  customerName: string
  businessPhone?: string
}

type CustomerState = {
  customer: Customer[]
  isOpenForm: boolean
  openForm: () => void
  closeForm: () => void
  createCustomer: (customer: Customer) => void
}

export const useCustomerStore = create<CustomerState>()(
  persist((set) => ({
    customer: [
      {
        id: v4(),
        "document": "12.345.678/0001-95",
        "contact": "Ana Paula Martins",
        "email": "ana.martins@logbrasil.com.br",
        "phone": "(11) 98888-1234",
        "customerName": "LogBrasil Transportes LTDA",
        "businessPhone": "(11) 4004-2020"
      },
      {
        id: v4(),
        "document": "98.765.432/0001-10",
        "customerName": "Construtora Horizonte SA",
        "email": "contato@horizonte.com",
        phone: "(22) 99999-8888",
        contact: "João Silva"
      },
      {
        id: v4(),
        "document": "45.678.123/0001-77",
        "contact": "Carlos Eduardo Rocha",
        "phone": "(21) 97777-6655",
        "customerName": "Rocha Engenharia EIRELI",
        "businessPhone": "(21) 3333-9999",
        email: "contato@rocha.com.br"
      },
      {
        id: v4(),
        "document": "32.109.654/0001-23",
        "customerName": "Delícias da Serra Padaria",
        contact: "Maria Santos",
        "email": "deliciasdaserra@padaria.com.br",
        "phone": "(31) 98765-4321"
      },
      {
        id: v4(),
        "document": "11.222.333/0001-44",
        "contact": "Luciana Almeida",
        "customerName": "Almeida Soluções Digitais ME",
        "email": "luciana.almeida@solucoes.com.br",
        "businessPhone": "(41) 3555-8899"
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
    createCustomer: (customer) => {
      console.log(customer)
      set((state) => ({
        customer: [...state.customer, {...customer, id: v4()}]
      }))
    }
  }
    ), {
    name: "customer-storage",
    partialize: (state) => ({
      customer: state.customer
    })
    } 
  )
)