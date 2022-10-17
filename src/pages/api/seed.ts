import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '@/database'
import { User, Entry } from '@/models'
import { config } from '@/config'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!config.isDev) {
    return res.status(401).json({ message: 'No tiene acceso a este endpoint' })
  }

  await db.connect()
  await User.deleteMany()
  await User.insertMany(seedData.initialData.users)
  await Entry.deleteMany()
  // await Entry.insertMany(seedData.initialData.entries)
  await db.disconnect()

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}