import bcrypt from 'bcryptjs'
import { db } from "@/database"
import { User } from "@/models"
import type { User as IOAuthUser } from 'next-auth'

export async function checkUserEmailPassword (email: string = '', password: string = '') {
  await db.connect()

  const user = await User.findOne({ email })
  await db.disconnect()

  if (!user) {
    return null
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null
  }

  const { role, name, _id } = user

  return {
    _id,
    email: email,
    role,
    name
  }
}

// Crea o verifica el usuario de OAuth
export async function oAuthToDbUser (oAuthUser: IOAuthUser) {
  await db.connect()
  const user = await User.findOne({ email: oAuthUser.email })

  if (user) {
    const { _id, name, email, role, picture } = user
    if (picture === null) {
      user.updateOne({ picture: oAuthUser.image })
      await user.save()
    }
    await db.disconnect()
    return { _id, name, email, role, picture }
  }

  const newUser = new User({ email: oAuthUser.email, name: oAuthUser.name, picture: oAuthUser.image, password: '@', role: 'client' })
  await newUser.save()
  await db.disconnect()

  const { _id, name, email, role, picture } = newUser
  return { _id, name, email, role, picture }
}