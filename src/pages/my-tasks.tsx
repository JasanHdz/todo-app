import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { Layout, EntryList } from '@/components'

const MeTasks: NextPage = () => {
    return (
        <Layout title='Mi lista de tareas'>
            <div className='grid grid-cols-12 gap-6'>
                <EntryList title='Pendientes' status='pending' />
                <EntryList title='En progreso' status='in-progress' />
                <EntryList title='Completadas' status='finished' />
            </div>
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
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

export default MeTasks
