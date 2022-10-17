import { IUser } from './user'

export interface IEntry {
    _id: string
    user: string | IUser
    description: string
    createdAt: number
    status: EntryStatus
}

export interface IDraggingEntry {
    entry: IEntry | null
    clientHeight: number | null
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished'