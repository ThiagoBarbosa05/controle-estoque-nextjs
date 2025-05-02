import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Customer = {
  id: string;
  name: string;
};

type CustomerState = {
  customer: Customer;
  isOpenForm: boolean;
  openForm: () => void;
  closeForm: () => void;
  createCustomer: (customer: Customer) => void;
  deleteCustomer: () => void;
  reset: () => void;
};

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customer: { id: "", name: "" },
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
      createCustomer: (customer) => {
        set((state) => ({
          customer,
        }));
      },
      deleteCustomer: () => {
        set(() => ({ customer: { id: "", name: "" } }));
      },
      reset: () => {
        set(() => ({}));
      },
    }),
    {
      name: "customer-storage",
      partialize: (state) => ({
        customer: state.customer,
      }),
    }
  )
);
