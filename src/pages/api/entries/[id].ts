import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '@/database'
import { Entry } from '@/models'
import type { IEntry } from '@/interfaces'

type Data = { message: string } | { message: string, data: IEntry }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            message: 'El id no es valido ' + id
        })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res)
        case 'GET':
            return getEntry(req, res)
        default:
            return res.status(404).json({ message: 'Endpoint not found' })
    }

}

async function updateEntry(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query
    const { description = '', status = '' } = req.body

    
    try {
        await db.connect()
        const entryToUpdate = await Entry.findById(id)

        if (!entryToUpdate) {
            return res.status(400).json({ message: `No existe una entrada con ese id: ${id}` })
        }
    
        const updatedEntry = await Entry.findByIdAndUpdate(id, { 
            description: description ?? entryToUpdate.description,
            status: status ?? entryToUpdate.status,
        }, { runValidators: true, new: true })
    
        return res.status(201).json({ message: 'ok', data: updatedEntry! })

    } catch (error: any) {
        await db.disconnect()

        res.status(error?.status ?? 500).json({
            message: error?.message ?? 'Ocurrio un error al insertar la entrada!',
        })   
    }
}

async function getEntry(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query

    try {
        await db.connect()
        const entry = await Entry.findById(id)
    
        if (!entry) {
            return res.status(400).json({ message: `No existe una entrada con ese id: ${id}` })
        }
    
        return res.status(201).json({ message: 'ok', data: entry! })
    } catch (error: any) {
        await db.disconnect()

        res.status(error?.status ?? 500).json({
            message: error?.message ?? 'Ocurrio un error al insertar la entrada!',
        })   
    }


}

