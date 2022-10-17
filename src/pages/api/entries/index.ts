import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Entry } from '@/models'
import { IEntry } from '@/interfaces'
import { getSession } from 'next-auth/react'
import { IUser } from '../../../interfaces/user';

type Data = { message: string } | { message: string, data: IEntry[] } | { message: string, data: IEntry }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(req, res)
        case 'POST':
            return postEntry(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint not found' })
    }

}

async function getEntries(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        await db.connect()
        const entries = await Entry.find().sort({ createdAt: 'ascending' }).populate('user', '_id name email picture')

        await db.disconnect()

        res.status(200).json({
            message: 'ok',
            data: entries
        })
    } catch (error: any) {
        res.status(error?.status ?? 500).json({
            message: error?.message ?? 'Ocurrio un error al obtener los registros',
        })
    }
}

async function postEntry(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { description = '', status = '' } = req.body
    const session = await getSession({ req })
    const user = session?.user as IUser

    if (!session) {
        return res.status(401).json({
            message: 'Debe de estar autenticado para hacer esto!'
        })
    }

    const newEntry = new Entry({
        user: user._id,
        createdAt: Date.now(),
        description,
        status
    })

    try {
        await db.connect()
        await newEntry.save()
        await newEntry.populate('user', '_id name email picture')
        await db.disconnect()

        return res.status(201).json({ message: 'entry inserted ok', data: newEntry })

    } catch (error: any) {
        await db.disconnect()

        res.status(error?.status ?? 500).json({
            message: error?.message ?? 'Ocurrio un error al insertar la entrada!',
        })   
    }
}

