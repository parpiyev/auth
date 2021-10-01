import fs from "fs"
import path from "path"
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js"
import { NextFunction, Request, Response } from "express"
import { verifyToken, generateToken } from "../config/jwt"
import catchAsync from "../utils/catchAsync"
import { storage } from "../storage/main"
import { logger } from "../config/logger"
import AppError from "../utils/appError"
import { IUser } from "../models/User"

export class UserController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const _users = await storage.user.find(req.query)
        let users: object[] = []

        const decrypt = (data: any) => {
            return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
        };
        _users.forEach(user => {
            let lastName = decrypt(user.last_name)
            let firstName = decrypt(user.first_name)
            let _age = decrypt(user.age)
            let _email = decrypt(user.email)

            let photo: any
            if (user.photo.length > 0)
                photo = decrypt(user.photo[0])

            users.push({
                _id: user._id,
                last_name: lastName,
                first_name: firstName,
                age: _age,
                photo: user.photo.length > 0 ? [photo] : [],
                email: _email,
                time: user.time,
                count_viewscount_views: user.count_views
            })
        });

        res.status(200).json({ success: true, data: { users } })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await storage.user.findById(req.params.id)

        const decrypt = (data: any) => {
            return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
        };

        let last_name = decrypt(user.last_name)
        let first_name = decrypt(user.first_name)
        let age = decrypt(user.age)
        let email = decrypt(user.email)

        let photo: any
        if (user.photo.length > 0)
            photo = decrypt(user.photo[0])

        res.status(200).json({ success: true, data: { user: { _id: user._id, last_name: last_name, first_name: first_name, age: age, photo: user.photo.length > 0 ? [photo] : [], email: email, time: user.time, count_views: user.count_views } } })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        let _token = await verifyToken(req.headers.authorization)

        const { last_name, first_name, age, email, password } = req.body

        let photos = []
        for (let photo of req.files as Express.Multer.File[]) {
            photos.push(`/api/file/${photo.filename}`)
        }

        const encrypt = (text: any) => {
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
        };

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        if (/^[A-Z]+$/.test(last_name[0]) != true || /^[A-Z]+$/.test(first_name[0]) != true)
            return next(new AppError(401, 'user'))

        let last = last_name.slice(1), first = first_name.slice(1)
        if (/^[a-z]+$/.test(last) != true || /^[a-z]+$/.test(first) != true)
            return next(new AppError(401, 'user'))

        let lastName = encrypt(last_name)
        let firstName = encrypt(first_name)
        let _age = encrypt(age)
        let _email = encrypt(email)

        let photo: any
        if (photos.length > 0)
            photo = encrypt(photos[0])

        if (_token != email)
            return next(new AppError(403, 'approved'))

        const user = await storage.user.create({
            last_name: lastName,
            first_name: firstName,
            age: _age,
            photo: photo && photo.length > 0 ? [photo] : [],
            email: _email,
            password: hashPassword
        } as IUser)

        let token = await generateToken(user._id)

        res.status(201).json({ success: true, token })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { last_name, first_name, age, email, password, new_password } = req.body
        const _user = await storage.user.findById(req.params.id)
        let hashPassword: any
        let userPhoto: any

        if (_user.photo.length > 0) {
            _user.photo.forEach((element) => {
                userPhoto = element.trim().split("/api/file/").pop()
            })

            fs.unlink(path.join(__dirname, "../", "uploads", userPhoto), (err) => {
                if (err) return err
            })
        }

        let photos = []
        for (let photo of req.files as Express.Multer.File[]) {
            photos.push(`/api/file/${photo.filename}`)
        }

        const encrypt = (text: any) => {
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
        };

        if (new_password) {
            const isValidPassword = bcrypt.compareSync(password, _user.password)
            if (!isValidPassword) return next(new AppError(403, "passsword"))

            const salt = await bcrypt.genSalt()
            hashPassword = await bcrypt.hash(new_password, salt)
        }

        if (/^[A-Z]+$/.test(last_name[0]) != true || /^[A-Z]+$/.test(first_name[0]) != true)
            throw new AppError(401, 'Ismni va Familiya bo\'sh xarifi kotta va lotin xariflarida bo\'lishi kerak!')

        let last = last_name.slice(1), first = first_name.slice(1)
        if (/^[a-z]+$/.test(last) != true || /^[a-z]+$/.test(first) != true)
            throw new AppError(401, 'Ismni va Familiya bo\'sh xarifidan boshqa xariflar kichik va lotin xariflarida bo\'lishi kerak!')

        let lastName = encrypt(last_name)
        let firstName = encrypt(first_name)
        let _age = encrypt(age)
        let _email = encrypt(email)

        let photo: any
        if (photos.length > 0)
            photo = encrypt(photos[0])

        const user = await storage.user.update(req.params.id, {
            last_name: lastName,
            first_name: firstName,
            age: _age,
            photo: photo.length > 0 ? [photo] : [],
            email: _email,
            password: hashPassword
        } as IUser)

        res.status(200).json({ success: true, data: { user: { _id: user._id, last_name: last_name, first_name: first_name, age: age, photo: photos, email: email, } } })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.user.delete(req.params.id)

        res.status(204).json({ success: true, data: null })
    })
}