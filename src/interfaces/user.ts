export interface IUser {
  _id      : string
  name     : string
  email    : string
  password?: string
  role     : string
  picture  : null | string

  createdAt?: string
  updatedAt?: string
}