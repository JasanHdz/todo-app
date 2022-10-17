import mongoose, { Schema, model, Model } from 'mongoose'
import type { IUser } from '@/interfaces'

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    picture: { type: String, require: true, default: null },
    role: {
        type: String,
        enum: {
            values: ['admin', 'client'],
            message: '{VALUE} no es un role válido',
            default: 'client',
            required: true
        }
    }
}, {
    timestamps: true
})

const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User