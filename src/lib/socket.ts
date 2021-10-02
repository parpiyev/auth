import { verifyToken } from "../config/jwt";
import { IUser } from "../models/User";
import { storage } from "../storage/main"
let users = {} as { [fileadnams: string]: { id: string } }
export const socket = (io: any, socket: any) => {
    // socket.on("connected", async (token: any) => {
    //     let { _id } = await verifyToken(token.token);

    //     users[_id] = {
    //         id: socket.id
    //     }

    //     socket.emit("users", { users });

    //     await storage.user.update(_id, { $inc: { count_views: 1 } });

    //     io.emit("hello", { user_id: _id, date: "online" })
    // })

    // socket.on("disconnecting", () => {
    //     socket.emit("hay", { hay: "shunaqa gaplar" })
    // });

    // socket.on("disconnect", async () => {
    //     let user_id;

    //     for (let key in users) {
    //         if (users[key].id == socket.id) {
    //             user_id = key
    //             users[key].id = ""
    //             break;
    //         }
    //     }
    //     let date = `${new Date().getHours()}: ${new Date().getMinutes()}`

    //     if (user_id) {
    //         await storage.user.update(user_id, { time: date } as IUser)
    //     }

    //     io.emit("hello", { user_id, date })
    // })
}