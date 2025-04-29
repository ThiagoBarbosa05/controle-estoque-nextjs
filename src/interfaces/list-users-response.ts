export interface User {
  id: string
  name: string
  email: string
  createdAt: Date | string
  roles: {
    id: string
    name: string
  }[]
  customer: {
    id: string
    name: string
  }
}

export interface ListUsersResponse {
  users: User[]
}