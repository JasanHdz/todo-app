import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Entry } from '@/models'
import { IEntry, IUser } from '@/interfaces'
import { getSession } from 'next-auth/react'

type Data = { message: string } | { message: string, data: IEntry[] } | { message: string, data: IEntry }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getMyEntries(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint not found' })
    }

}

async function getMyEntries(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = await getSession({ req })
    const user = session?.user as IUser
    try {

        if (!session || !user) {
            return res.status(401).json({
                message: 'Debe de estar autenticado para hacer esto!'
            })
        }

        await db.connect()
        const entries = await Entry.where({ user: user._id }).populate('user', '_id name email picture')

        await db.disconnect()

        res.status(200).json({
            message: 'ok',
            data: entries ?? []
        })
    } catch (error: any) {
        res.status(error?.status ?? 500).json({
            message: error?.message ?? 'Ocurrio un error al obtener los registros',
        })
    }
}
