import { NextFunction, Request, Response } from "express"
import config from "../config/config"
import AppError from "../utils/appError"
import { getMessage } from '../config/getMessage'

export class ErrorController {
    sendErrorDev = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        let message = getMessage({ status: err.statusCode, model_name: err.message }, lang)
        return res.status(err.statusCode).json({
            success: false,
            error: err,
            message: message.length > 0 ? message : err.message,
            stack: err.stack
        })
    }

    sendErrorProd = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message
            })
        }

        // B) Programming or other unknown error: don't leak error details
        console.error("ERROR 💥", err)
        res.status(500).json({
            success: false,
            message: "Something went very wrong!"
        })
    }

    hanle = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        err.statusCode = err.statusCode || 500
        err.status = err.status || "error"

        if (config.NodeEnv === "development") {
            this.sendErrorDev(err, req, res, next)
        } else if (config.NodeEnv === "production") {
            this.sendErrorProd(err, req, res, next)
        }
    }
}
