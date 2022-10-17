import { Wrapper, Avatar, Collpase } from '@/components'
import { AuthContext } from 'context/auth';
import Link from 'next/link'
import React, { useState } from 'react'
import { useContext } from 'react';

const menux = [
    {
        label: 'Inicio',
        path: '/'
    },
    {
        label: 'Mis tareas',
        path: '/me/tasks'
    },
]

function Navbar() {
    const { isLoggedIn, user } = useContext(AuthContext)
    const [isActiveCollapse, setIsActiveCollapse] = useState(false)
    return (
        <nav className='bg-white shadow-md'>
            <Wrapper className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <Link href="/">
                        <a className='text-blue900'>
                            TODOAPP
                        </a>
                    </Link>
                    <ul className='hidden sm:flex mx-8'>
                        {menux.map(({ label, path }) => {
                            return (
                                <Link href={path} key={label}>
                                    <a className='p-4 lg:py-3 lg:px-6 hover:text-gray-300' >{label}</a>
                                </Link>
                            )
                        })}
                    </ul>

                </div>
                <div>
                    {isLoggedIn && (
                        <>
                            <div className='flex gap-2.5 items-center cursor-pointer relative' onClick={() => setIsActiveCollapse(!isActiveCollapse)}>
                                <Avatar fullName={user?.name ?? ''} url={user?.picture} />
                                <svg width="14px" height="9px" className={`transition ease-in duration-150 icons__Svg-sc-1tw18hn-0 eoBnVa ${isActiveCollapse ? 'transform rotate-180' : ''}`} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path width="14px" height="9px" d="M2.42969 0.5L0.929688 2L7 8.07031L13.0703 2L11.5703 0.5L7 5.07031L2.42969 0.5Z" fill="black"></path></svg>
                                {isActiveCollapse && <Collpase />}
                            </div>
                        </>
                    )}
                </div>
            </Wrapper>
        </nav>
    )
}

export default Navbar