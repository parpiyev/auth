import path from "path"
import otpRouter from "./otp"
import userRouter from "./user"
import loginRouter from "./login"
import sampleRouter from "./sample"
import express, { Router } from "express"

const router = Router({ mergeParams: true })

router.use("/otp", otpRouter)
router.use("/user", userRouter)
router.use("/login", loginRouter)
router.use("/sample", sampleRouter)
router.use("/api/file", express.static(path.join(__dirname, "../", "uploads")))

export default router
