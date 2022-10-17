import React from 'react'

interface Props {
    url?: string | null
    fullName: string
}

function Avatar({ url, fullName }: Props) {
    const [name = '', lastName = ''] = fullName.split(' ')
    if (!url) return (
        <div className='bg-teal-600 border rounded-full w-9 h-9 flex items-center justify-center text-white select-none'>
            <span className='uppercase'>{name.charAt(0)}{lastName.charAt(0)}</span>
        </div>
    )
    return (
        <figure className='block'>
            <img className='object-cover rounded-full select-none' src={url} width={36} height={36} alt='Avatar' />
        </figure>
    )
}

export default Avatar