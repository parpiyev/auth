import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class UserValidator {
    keys = {
        required: "required",
        optional: "optional"
    }

    createSchema = Joi.object({
        last_name: Joi.string().required().min(3).max(20),
        first_name: Joi.string().required().min(5).max(22),
        age: Joi.number().required().min(18).max(63),
        photo: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().min(6)
    })

    updateSchema = Joi.object({
        last_name: Joi.string().required().min(3).max(20),
        first_name: Joi.string().required().min(5).max(22),
        age: Joi.number().required().min(18).max(63),
        photo: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6),
        new_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(6)
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}