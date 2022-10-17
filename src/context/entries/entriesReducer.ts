import { EntriesState } from '@/context'
import { IEntry, IDraggingEntry, EntryStatus } from '@/interfaces';

type EntriesActionType =
    | { type: 'Add-Entry', payload: IEntry } 
    | { type: 'UPDATE_ENTRY', payload: IEntry }
    | { type: 'REFRESH_DATA', payload: IEntry[] }
    // frontend methods with action user
    | { type: 'Start-Dragging', payload: IDraggingEntry }
    | { type: 'UPDATE_COLUMN_STATUS', payload: EntryStatus }
    | { type: 'End-Dragging' }

export function entriesReducer(state: EntriesState, action: EntriesActionType): EntriesState {
    switch (action.type) {
        case 'Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case 'REFRESH_DATA':
            return {
                ...state,
                entries: action.payload
            }
        case 'UPDATE_ENTRY':
            return {
                ...state,
                entries: state.entries.map((entry) => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status
                    }
                    return entry
                })
            }
        case 'Start-Dragging':
            return {
                ...state,
                draggingEntry: action.payload,
                isDragging: true
            }
        case 'UPDATE_COLUMN_STATUS':
            return {
                ...state,
                currentColumnStatus: action.payload
            }
        case 'End-Dragging':
            return {
                ...state,
                draggingEntry: {
                    entry: null,
                    clientHeight: 0,
                },
                isDragging: false,
                currentColumnStatus: null,
            }
        default:
            return state
    }
}