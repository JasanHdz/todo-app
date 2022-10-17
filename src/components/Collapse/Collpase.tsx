import Link from 'next/link'
import React, { useContext } from 'react'
import { UserIcon, CheckIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { AuthContext } from '@/context'

const items = [
    {
        label: 'Mi perfil',
        icon: <UserIcon className='w-6 h-6 text-sky-500' />,
        detail: 'Accede y administra tus datos.',
        path: '/profile'
    },
    {
        label: 'Mis tareas',
        icon: <CheckIcon className='w-6 h-6 text-green-600' />,
        detail: 'Revisa todas tus tareas.',
        path: '/me/tasks'
    },
    {
        label: 'Preferencias',
        icon: <Cog6ToothIcon className='w-6 h-6' />,
        detail: 'Configura tus preferencias de sistema.',
        path: '/settings'
    },
]

function Collpase() {
    const { logout } = useContext(AuthContext)
    return (
        <div className='absolute top-10 right-0 rounded-lg shadow-lg border w-80 bg-white p-6'>
            <ul className='grid gap-2'>
                {items.map(({ path, label, detail, icon }) => (
                    <li key={path}>
                        <Link href={path}>
                            <a className='flex gap-2 items-center'>
                                <div className='p-1 bg-slate-100 rounded-full'>
                                    {icon}
                                </div>
                                <div className='select-none'>
                                    <p className='hover:text-sky-500 font-medium'>{label}</p>
                                    <small>{detail}</small>
                                </div>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="border-gray-200 border-b my-4" />
            <button className='hover:text-sky-500 font-medium select-none' onClick={logout}>
                Cerrar sessión
            </button>
        </div>
    )
}

export default Collpase