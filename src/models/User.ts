import { number } from "joi"
import mongoose, { Schema, Document } from "mongoose"
import { v4 as uuidv4 } from 'uuid'

export interface IUser extends Document {
    _id: string
    last_name: string
    first_name: string
    age: string
    photo: string[]
    email: string
    password: string
    time: string
    role: any
}

let roles = {
    user: {
        name: "user",
        operations: ['user']
    }
}

let userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    last_name: {
        type: String
    },
    first_name: {
        type: String
    },
    age: {
        type: String
    },
    photo: {
        type: Array
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    time: {
        type: String,
    },
    role: {
        type: Object,
        default: roles.user
    }
})

export default mongoose.model<IUser>("User", userSchema)