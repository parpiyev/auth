import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IOTP extends Document {
    _id: string
    email: string
    code: number
    created_at: Date
}

let roles: any = {
    user: {
        name: "user",
        operations: ['user']
    }
}

const otpSchema: Schema<IOTP> = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: '3m'
    },
    role: {
        type: Object,
        default: roles.user
    }
})

export default mongoose.model<IOTP>('OTP', otpSchema)
