import { EntryStatus } from '@/interfaces';
import { DragEvent, useState, useContext, useMemo } from 'react'
import EntryCard from './EntryCard';
import { EntriesContext } from '@/context';
import AddNewEntry from './AddNewEntry';

interface Props {
    title: string
    status: EntryStatus
}

function EntryList({ title, status }: Props) {
    const { entries, draggingEntry, currentColumnStatus, setCurrentColumnStatus } = useContext(EntriesContext)

    const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries, status])

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const currentStatus = event.currentTarget.id as EntryStatus
        setCurrentColumnStatus(currentStatus)
        event.dataTransfer.clearData()
    }

    return (
        <div className='col-span-4 h-11 border entry-col bg-gray-300 shadow-lg p-2'>
            <p className='mb-2'>{title}</p>
            <div id={status} onDragOver={allowDrop} className={`entries-list border bg-gray-100 overflow-y-scroll p-1 flex flex-col gap-2 transition-all duration-300`}>
                {entriesByStatus.map((entry) => (
                    <EntryCard key={entry._id} entry={entry} />
                ))}
                {currentColumnStatus === status && (
                    <div className='bg-gray-200' style={{ height: draggingEntry.clientHeight ?? 20 }}></div>
                )}
                <AddNewEntry status={status} />
            </div>
        </div>
    )
}

export default EntryList