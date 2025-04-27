export interface Customer {
  id: string
  name: string
  contactPerson: string
  email: string
  cellphone: string
  businessPhone: string 
}

export interface ListCustomerResponse {
  customers: Customer[]
}