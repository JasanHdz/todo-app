import mongoose from 'mongoose'
import { config } from '@/config'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
*/
const mongoConnection = {
  isConnected: 0
}

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('is connected')
    return
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState

    if (mongoConnection.isConnected === 1) {
      console.log('Usando last connection')
      return
    }

    await mongoose.disconnect()
  }

  await mongoose.connect(config.mongoUrl)
  mongoConnection.isConnected = 1
  console.log('connected to mongodb: ', config.mongoUrl)
}


export const disconnect = async () => {
  if (mongoConnection.isConnected !== 0) return

  await mongoose.disconnect()
  console.log('disconnected to mongodb')
}