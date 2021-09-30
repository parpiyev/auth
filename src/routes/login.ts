import { Router } from "express"
import { LoginController } from "../controllers/login"
import { LoginValidator } from "../validators/login"

const router = Router({ mergeParams: true })
const controller = new LoginController()
const validator = new LoginValidator()

router.route("/").post(controller.findOne)

export default router