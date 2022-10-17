import { useCallback, useLayoutEffect, useState, useContext } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Input, Button } from '..'
import { useForm } from '@/hooks'
import { EntriesContext } from '@/context';
import { EntryStatus } from '@/interfaces';

function AddNewEntry({ status }: { status: EntryStatus }) {
    const [showAddCard, setShowAddCard] = useState(false)
    const { addNewEntry } = useContext(EntriesContext)
    const { onChange, onSubmit, isDisabled } = useForm({
        handleSubmit: ({ description }) => {
            description.length && addNewEntry(description, status)
            setShowAddCard(false)
        }
    })

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setShowAddCard(false)
        }
    }, [])

    useLayoutEffect(() => {
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyUp])

    if (!showAddCard) {
        return (
            <button className='flex items-center gap-2 p-1 text-sm select-none hover:text-blue-500 text-gray-500 w-fit' onClick={() => setShowAddCard(true)}>
                <PlusIcon className='w-5 h-5 ' />
                <span>Add a card</span>
            </button>
        )
    }

    return (
        <div className='border min-h-max shadow-sm flex flex-col gap-1  py-1.5 px-2.5 select-none rounded-sm'>
            <form onSubmit={onSubmit}>
                <Input type="text" placeholder='Escribe una nueva entrada para la card' className='text-sm mb-2.5' onChange={onChange} name="description" />
                <div className='flex items-center justify-between'>
                    <Button className='font-light' disabled={isDisabled}>Agregar</Button>
                    <Button padding={0} variant='tertiary' type='button' onClick={() => setShowAddCard(false)}>
                        <XMarkIcon className='w-7 h-7 ' />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddNewEntry