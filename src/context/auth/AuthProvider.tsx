import type { Session } from "next-auth"
import { ReactNode, useEffect, useReducer, useState } from "react"
import { useSession, signOut, signIn } from 'next-auth/react'
import { AuthContext, authReducer } from "@/context"
import { IFormLogin, IFormRegister } from "interfaces/auth"
import { createUser } from '../../api/authApi';
import { useRouter } from "next/router"

export interface AuthState {
    isLoggedIn: boolean
    user?: any
    errorAuth: string
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
    errorAuth: '',
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { error = '' } = useRouter().query
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const { data: session, status }: { data?: Session | null, status: string } = useSession()

    const logout = () => signOut()

    const loginWithCredentials = async (values: IFormLogin) => {
        const { email, password } = values
        if (email && password) {
            await signIn('credentials', { email: values?.email, password: values?.password })
        }
    }

    const loginWithSocials = (provider: 'github' | 'google') => {
        signIn(provider)
    }

    const signUp = (values: IFormRegister) => {
        state.errorAuth.length && dispatch({ type: 'ERROR_AUTH', payload: '' })
        const { email, lastName, name, password } = values
        const fullName = lastName?.length ? `${name} ${lastName}` : name
        if (email && fullName && password) {
            console.log('loading... create user...')
            createUser({ name: fullName, email, password })
                .then(() => {
                    signIn('credentials', { email, password })
                })
                .catch(({ message }) => {
                    if (typeof message === 'string') dispatch({ type: 'ERROR_AUTH', payload: message })
                })
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: session?.user })
        }
    }, [status, session])

    useEffect(() => {
        if (error) {
            dispatch({ type: 'ERROR_AUTH', payload: 'Error de credenciales' })
        }
    }, [error])

    return <AuthContext.Provider value={{
        ...state,
        logout,
        loginWithCredentials,
        loginWithSocials,
        signUp,
    }}>{children}</AuthContext.Provider>
}