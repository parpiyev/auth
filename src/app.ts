import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"
import routes from "./routes/index"
import { expressLogger } from "./config/logger"
import { ErrorController } from "./controllers/error"
import http from "http";
import { verifyToken } from './config/jwt'
import { IUser } from './models/User'
import { storage } from "./storage/main"

const app = express()
const errorController = new ErrorController()
app.use(cors())
const server = new http.Server(app)
const io = require("socket.io")(server)
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLogger())
app.use(express.static(path.join(__dirname, "uploads")));

app.use(routes)

let token: string | any
io.on("connection", (socket: any) => {
    socket.on('user', async (data: string) => {
        token = await verifyToken(data)
    })
    socket.emit('online', 'online')
    socket.on('online', async (data: string) => {
        await storage.user.update(token._id, { time: data } as IUser)
    })
    socket.on('disconnect', async () => {
        await storage.user.update(token._id, { time: `${new Date().getHours()}-${new Date().getMinutes()}` } as IUser)
    })
});


app.get("/status", (req: Request, res: Response) => {
    res.json({
        stauts: "OK"
    })
})

app.use(errorController.hanle)

export default server