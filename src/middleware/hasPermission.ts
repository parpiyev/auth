import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../config/jwt"
import { storage } from "../storage/main"
import AppError from "../utils/appError"

export function hasPermission(operation: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        let token = await verifyToken(req.headers.authorization)

        if (!token) res.status(403).json({ success: false, message: "Token not found!" })

        let user: any = await storage.user.findOne({ _id: token._id })
        if (!user) res.status(403).json({ success: false, message: "User not found!" })

        if (user.role.operations.indexOf(operation) != -1) {
            res.locals.user = token._id

            next()
        } else {
            next(new AppError(403, 'operation'))
        }
    }
}