import bcrypt from 'bcryptjs'

export interface SeedUser {
    name    : string
    email   : string
    password: string
    role    : 'admin' | 'client',
    picture?: string
}

export const usersInitialData: SeedUser[] = [
    {
        name: 'Roberto Perez',
        email: 'robert@google.com',
        password: bcrypt.hashSync('123456'),
        role: 'admin',
    },
    {
        name: 'Pedro Rodriguez',
        email: 'petter@google.com',
        password: bcrypt.hashSync('123456'),
        role: 'client',
    },
    {
        name: 'Jesus Garrido',
        email: 'jesus@google.com',
        password: bcrypt.hashSync('123456'),
        role: 'client',
    },
]