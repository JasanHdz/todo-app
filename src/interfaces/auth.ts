import { Dispatch, SetStateAction } from "react"

export interface IFormLogin {
    email   ?: string
    password?: string
}

export interface IFormRegister extends IFormLogin {
    name    ?: string
    lastName?: string
}

export interface IPayloadSignUp {
    name    : string
    email   : string
    password: string
}

export interface IValidatorForm {
    target: HTMLInputElement
    errors: { [key: string]: any }
    setErrors: Dispatch<SetStateAction<{ [key: string]: any }>>
}