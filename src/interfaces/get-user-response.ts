export interface User {
  id: string
  name: string
  email: string
  roles: {
    id: string
    name: string
  }[]
  customer: {
    id: string
    name: string
  }
}

export interface GetUserResponse {
  user: User
}