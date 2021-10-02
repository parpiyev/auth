"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
var users = {};
var socket = function (io, socket) {
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
};
exports.socket = socket;
