import React from 'react'

interface Props {
    url?: string | null
    fullName: string
    size?: number
}

function Avatar({ url, fullName, size = 36 }: Props) {
    const [name = '', lastName = ''] = fullName.split(' ')
    if (!url) return (
        <div className='bg-teal-600 border rounded-full flex items-center justify-center text-white select-none' style={{ width: size, height: size }}>
            <span className='uppercase'>{name.charAt(0)}{lastName.charAt(0)}</span>
        </div>
    )
    return (
        <figure className='block'>
            <img className='object-cover rounded-full select-none' src={url} width={size} height={size} alt='Avatar' />
        </figure>
    )
}

export default Avatar