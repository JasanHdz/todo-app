import React, { DragEvent, useContext } from 'react'
import { IEntry } from '@/interfaces'
import { EntriesContext } from '@/context'
import { Avatar } from '..'
import { IUser } from '../../interfaces/user';
import { getTimeAgo } from '@/utils';

interface Props {
    entry: IEntry
}

function EntryCard({ entry }: Props) {
    const user = entry.user as IUser
    const { startDragging, endDragging } = useContext(EntriesContext)

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        startDragging(event.currentTarget, entry)
    }

    return (
        <div draggable onDragStart={onDragStart} onDragEnd={endDragging} className='border w-full min-h-max py-1.5 px-2.5 shadow-sm flex flex-col gap-1 hover:bg-slate-300 cursor-pointer select-none rounded-sm'>
            <div className='flex justify-between gap-1.5 h-fit'>
                <p className='text-sm line-clamp-3 flex-1'>{entry.description}</p>
                <div className='w-fit'>
                    <Avatar fullName={user?.name ?? 'Sin Name'} url={user?.picture} />
                </div>
            </div>
            <small className='self-end' style={{ fontSize: 9 }}>{getTimeAgo(entry.createdAt)}</small>
        </div>
    )
}

export default EntryCard