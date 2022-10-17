import React, { ReactNode } from 'react'
import { Navbar, Wrapper, Footer } from '@/components'
import Head from 'next/head'

interface Props {
    children: ReactNode
    title?: string
}

function Layout({ children, title }: Props) {
    return (
        <>
            <Navbar />
            {title && (
                <Head>
                    <title>{title}</title>
                </Head>
            )}
            <Wrapper className='mx-auto'>
                {children}
            </Wrapper>
            <Footer />
        </>
    )
}

export default Layout