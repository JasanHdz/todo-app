import { IFormLogin, IFormRegister, IUser } from "@/interfaces"
import { createContext } from "react"

export interface ContextProps {
  isLoggedIn: boolean
  user?: IUser
  logout?: () => void
  loginWithCredentials: (values: IFormLogin) => Promise<void>
  loginWithSocials: (provider: 'github' | 'google') => void
  signUp: (values: IFormRegister) => void
  errorAuth: string
}

export const AuthContext = createContext({} as ContextProps)