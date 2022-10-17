import { createContext } from 'react';
import { IEntry, EntryStatus, IDraggingEntry } from '@/interfaces';

export interface EntriesContextProps {
    entries: IEntry[]
    addNewEntry: (description: string, status: EntryStatus) => void
    startDragging: (target: HTMLDivElement, entry: IEntry) => void
    endDragging: () => void
    isDragging: boolean
    draggingEntry: IDraggingEntry
    currentColumnStatus: EntryStatus | null
    setCurrentColumnStatus: (status: EntryStatus) => void
    refreshEntries: () => Promise<void>
}

export const EntriesContext = createContext({} as EntriesContextProps)