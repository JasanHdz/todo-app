import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Avatar, Layout } from '@/components'
import { AuthContext } from '@/context'
import styles from '@/styles/waves.module.css'
import { useContext } from 'react'

function Profile() {
    const { user } = useContext(AuthContext)
    return (
        <Layout className='p-0' isEmptyPadding>
            <div className={styles.container}>
                <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className={styles.parallax}>
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
                    <Avatar size={130} fullName={user?.name ?? ''} url={user?.picture} />
                    <div className='mt-4 text-white flex flex-col items-center'>
                        <h1 className='text-5xl font-bold'>{user?.name}</h1>
                        <p className='mt-2'>{user?.email ?? `@${user?.name}`}</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            props: {},
            redirect: {
                destination: '/auth/login',
                permanent: false
            },
        }
    }

    return {
        props: {}
    }
}

export default Profile