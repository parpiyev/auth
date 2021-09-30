import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class LoginValidator {
    keys = {
        required: "required",
        optional: "optional"
    }

    createSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}