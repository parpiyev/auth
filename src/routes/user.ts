import path from 'path'
import multer from 'multer'
import { NextFunction, Request, Response, Router } from "express"
import { hasPermission, } from "../middleware/hasPermission"
import { UserController } from "../controllers/user"
import { UserValidator } from "../validators/user"

const storage = multer.diskStorage({
    destination: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: null, destination: any) => void
    ) {
        cb(null, path.join(__dirname, '../', 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
})

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null, destination: boolean) => void
) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload: any = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const router = Router({ mergeParams: true })
const controller = new UserController()
const validator = new UserValidator()

router.route("/").get(hasPermission('user'), controller.getAll).post(upload.array('photo', 1), validator.create, controller.create)
router
    .route("/:id")
    .get(hasPermission('user'), controller.get)
    .patch(hasPermission('user'), validator.update, controller.update)
    .delete(hasPermission('user'), controller.delete)

export default router