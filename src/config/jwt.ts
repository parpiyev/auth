import jwt from "jsonwebtoken"
import config from "./config"

type DecodeToken = {
    _id: string
    iat: number
}

async function generateToken(data: any) {
    let token = await jwt.sign(data, config.JwtSecret)
    return token
}

async function verifyToken(token: any) {
    let isToken = (await jwt.verify(token, config.JwtSecret)) as DecodeToken
    return isToken
}

export { generateToken, verifyToken }