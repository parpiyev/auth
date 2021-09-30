import bcrypt from "bcrypt"
import CryptoJS from "crypto-js"
import { storage } from "../storage/main"
import catchAsync from "../utils/catchAsync"
import { generateToken } from "../config/jwt"
import { NextFunction, Request, Response } from "express"
import AppError from "../utils/appError"

export class LoginController {
    findOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const _users = await storage.user.find({})

        const decrypt = (data: any) => {
            return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
        };
        let _id
        _users.forEach(user => {

            let email = decrypt(user.email)

            if (email === req.body.email)
                _id = user._id
        });

        const user = await storage.user.findOne({ _id: _id })

        const isValidPassword = bcrypt.compareSync(req.body.password, user.password)
        if (!isValidPassword) return next(new AppError(403, "password"))

        const token = await generateToken({ _id: user._id })

        res.status(201).json({ success: true, token })
    })
}