import jwt from 'jsonwebtoken'
import { IUser } from 'src/interfaces'
import { config } from '../config'

export const signToken = (user: IUser)=> {
    const { _id, email, name, role } = user
    if (!config.jwtSecret) {
        throw new Error('No hay semilla de JWT')
    }
    return jwt.sign({
        uuid: _id, email, name, role
    }, config.jwtSecret, { expiresIn: '30d' })
}