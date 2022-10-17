import type { IValidatorForm } from "@/interfaces"
import { isValidEmail } from './index'

export const validatorSignInForm = ({ errors, setErrors, target }: IValidatorForm) => {
    const { name, value } = target
    const copy = { ...errors }
    switch(name) {
        case 'email':
            if (!isValidEmail(value)) {
                setErrors({
                    ...copy,
                    email: 'El correo no es valido!'
                })
            } else {
                delete copy.email
                setErrors(copy)
            }
            break
        case 'password':
            if (value.length < 6) {
                setErrors({
                    ...copy,
                    password: 'La contraseña debe tener al menos 6 caracteres'
                }) 
            } else {
                delete copy.password
                setErrors(copy)
            }
            break
        default:
            break
    }
}

export const validatorSignUpForm = ({ errors, setErrors, target }: IValidatorForm) => {
    const { name, value } = target
    const copy = { ...errors }
    switch(name) {
        case 'email':
            if (!isValidEmail(value)) {
                setErrors({
                    ...copy,
                    email: 'El correo no es valido!'
                })
            } else {
                delete copy.email
                setErrors(copy)
            }
            break
        case 'password':
            if (value.length < 6) {
                setErrors({
                    ...copy,
                    password: 'La contraseña debe tener al menos 6 caracteres'
                }) 
            } else {
                delete copy.password
                setErrors(copy)
            }
            break
        case 'name':
            if (value.length < 3) {
                setErrors({
                    ...copy,
                    name: 'El nombre debe de ser mayor a 3 caracteres'
                }) 
            } else {
                delete copy.name
                setErrors(copy)
            }
            break
        default:
            break
    }
}