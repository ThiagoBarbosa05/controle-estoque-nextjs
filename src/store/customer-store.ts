
import {create} from "zustand"
import { persist } from "zustand/middleware"
import {v4} from "uuid"

type Customer = {
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
  createCustomer: (customer: Customer) => void
}

export const useCustomerStore = create<CustomerState>()(
  persist((set) => ({
    customer: [{
      id: v4(),
      customerName: "cliente 1",
      contact: "Contato 1",
      document: "44.505.365/0001-43",
      email: "cliente@email.com",
      phone: "(22) 988455-5454"
    }],
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