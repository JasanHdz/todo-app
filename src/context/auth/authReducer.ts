import { AuthState } from '@/context'

type AuthActionType =
    | { type: '[Auth] - Login', payload: any }
    | { type: '[Auth] - Logout' }
    | { type: 'ERROR_AUTH', payload: string }

export function authReducer(state: AuthState, action: AuthActionType): AuthState {
    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined
            }
        case 'ERROR_AUTH':
            return {
                ...state,
                errorAuth: action.payload,
            }
        default:
            return state
    }
}