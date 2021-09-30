import { Router } from "express"
import { OtpController } from "../controllers/otp"

const router = Router({ mergeParams: true })
const opt = new OtpController()

router.route("/").post(opt.create)

export default router