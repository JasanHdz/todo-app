import { EntryStatus } from "@/interfaces"

export interface ISeedEntry {
    description: string
    createdAt: number
    status: EntryStatus
}

export const entriesInitialData: ISeedEntry[] = [
    {
        description: 'Pendiente - Consequat exercitation proident Lorem id aliqua ex eiusmod esse dolore laboris exercitation.',
        status: 'pending',
        createdAt: Date.now()
    },
    {
        description: 'En-Progreso Pariatur ut qui qui adipisicing duis duis in veniam adipisicing et deserunt aliquip magna incididunt.',
        status: 'in-progress',
        createdAt: Date.now() - 100000
    },
    {
        description: 'Completada - Eiusmod sunt officia labore est proident ipsum magna minim consequat dolore dolore.',
        status: 'finished',
        createdAt: Date.now() - 100000000
    },
    {
        description: 'Completada - Eiusmod sunt officia labore est proident ipsum magna minim consequat dolore dolore.',
        status: 'finished',
        createdAt: Date.now() - 100000000
    },
    {
        description: 'Completada - Eiusmod sunt officia labore est proident ipsum magna minim consequat dolore dolore.',
        status: 'finished',
        createdAt: Date.now() - 100000000
    },
]