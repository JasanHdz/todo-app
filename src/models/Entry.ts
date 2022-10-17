import mongoose, { Schema, model, Model } from 'mongoose'
import type { IEntry } from '@/interfaces'

const entrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    createdAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado válido',
            default: 'pending',
            required: true
        }
    }
})

const EntryModel: Model<IEntry> = mongoose.models.Entry || model('Entry', entrySchema)

export default EntryModel