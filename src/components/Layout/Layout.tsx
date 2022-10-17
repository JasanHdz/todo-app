import React, { ReactNode } from 'react'
import { Navbar, Wrapper, Footer } from '@/components'
import Head from 'next/head'

interface Props {
    children: ReactNode
    title?: string
    className?: string
    isEmptyPadding?: boolean
}

function Layout({ children, title, className, isEmptyPadding }: Props) {
    return (
        <>
            <Navbar />
            {title && (
                <Head>
                    <title>{title}</title>
                </Head>
            )}
            <Wrapper className={className} isEmptyPadding={isEmptyPadding}>
                {children}
            </Wrapper>
            <Footer />
        </>
    )
}

export default Layout