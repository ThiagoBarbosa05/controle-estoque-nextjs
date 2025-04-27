export interface CustomerDetails {
    id: string
    name: string
    document: string
        contactPerson: string
        email: string
        cellphone: string
        businessPhone: string
        stateRegistration: string
        createdAt: Date | string
        updatedAt: Date | string
        disabledAt: Date | string,
        address: {
            id: string
            streetAddress: string
            zipCode: string,
            state: string,
            city: string
            neighborhood: string
            number: string
            customerId: string
        }
}

export interface GetCustomerDetailsResponse {
    customer: CustomerDetails | null
}