import { ReactNode, useReducer, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import type { EntryStatus, IEntry, IDraggingEntry, IUser } from '@/interfaces';
import { EntriesContext, entriesReducer, AuthContext } from "@/context"
import { entriesApi } from '@/api'

export interface EntriesState {
    entries: IEntry[],
    isDragging: boolean
    draggingEntry: IDraggingEntry
    currentColumnStatus: EntryStatus | null
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    isDragging: false,
    currentColumnStatus: null,
    draggingEntry: {
        entry: null,
        clientHeight: 0,
    },
    entries: []
}

export const EntriesProvider = ({ children }: { children: ReactNode }) => {
    const { isLoggedIn, user } = useContext(AuthContext)
    const router = useRouter()
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    const addNewEntry = async (description: string, status: EntryStatus) => {
        try {
            const { data } = await entriesApi.post<IEntry>('/entries', { description, status })
            dispatch({ type: 'Add-Entry', payload: data })
        } catch (error: any) {
            console.error(error?.message)
        }
    }

    const startDragging = (target: HTMLDivElement, entry: IEntry) => {
        const entryUser = entry.user as IUser
        const newDraggingEntry: IDraggingEntry = {
            entry,
            clientHeight: target.clientHeight
        }
        if (user?._id === entryUser._id || user?.role === 'admin') {
            dispatch({ type: 'Start-Dragging', payload: newDraggingEntry })
        }
    }

    const setCurrentColumnStatus = (status: EntryStatus) => {
        if (status !== state.currentColumnStatus) {
            dispatch({ type: 'UPDATE_COLUMN_STATUS', payload: status })
        }
    }

    const updateEntryOnDrag = async ({ _id, description }: IEntry) => {
        try {
            const { data } = await entriesApi.put<IEntry>(`/entries/${_id}`, { description, status: state.currentColumnStatus! })
            dispatch({ type: 'UPDATE_ENTRY', payload: data })
        } catch (error) {
            console.error(error)
        }
    }

    const endDragging = () => {
        if (state.draggingEntry.entry !== null) {
            updateEntryOnDrag(state.draggingEntry.entry!)
            const entryUser = state.draggingEntry.entry?.user! as IUser
            if (user?._id === entryUser._id || user?.role === 'admin') {
                dispatch({ type: 'End-Dragging' })
            }
        } else {
            alert('No tienes el permiso necesario para actualizar las tareas de los demas! ❌🔐')
        }
    }

    const refreshEntries = useCallback(async () => {
        try {
            const url = router.pathname === '/' ? '' : '/me'
            const { data } = await entriesApi.get<IEntry[]>(`/entries${url}`)
            dispatch({ type: 'REFRESH_DATA', payload: data })
        } catch (error: any) {
            console.error(error)
        }
    }, [router.pathname])

    useEffect(() => {
        if (isLoggedIn) {
            console.log('isLoggedIn')
            refreshEntries()
        }
    }, [isLoggedIn, refreshEntries])


    return <EntriesContext.Provider value={{
        ...state,
        addNewEntry,
        startDragging,
        setCurrentColumnStatus,
        endDragging,
        refreshEntries,
    }}>{children}</EntriesContext.Provider>
}