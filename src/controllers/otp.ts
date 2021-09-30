import { NextFunction, Request, Response } from 'express'
import { generateToken } from '../config/jwt'
import catchAsync from '../utils/catchAsync'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import { IOTP } from '../models/OTP'
import nodemailer from "nodemailer"
import fetch from "node-fetch"

export class OtpController {
    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const { email, code } = req.body
        let token

        const otp = await storage.otp.findOne({ email })

        if (!otp) {


            // let response: any = await fetch(`https://api.antideo.com/email/${email}`, {
            //     headers: {
            //         apiKey: "86c3f9469a235e786021356e078e4fcf",
            //         "Content-Type": "application/json"
            //     }
            // });

            // response = await response.json();

            // if (response.free_provider !== true)
            //     return next(new AppError(401, 'email'))

            const code: number = Math.floor(100000 + Math.random() * 900000)

            await storage.otp.create({ email, code } as IOTP)

            let main = async (email: any) => {
                let transporter = nodemailer.createTransport({
                    service: 'mail.ru',
                    auth: {
                        user: "parpiyev98@mail.ru",
                        pass: "M199820j"
                    }
                });

                await transporter.sendMail({
                    from: 'parpiyev98@mail.ru',
                    to: email,
                    subject: "Code",
                    html: `<h1>${code}</h1>`
                });
            }
            main(email)
        } else {
            if (code !== otp.code) {
                return next(new AppError(400, 'sms'))
            } else {
                token = await generateToken(email)
            }
        }
        return res.status(200).json({ success: true, token })
    })
}