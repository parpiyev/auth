"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("./routes/index"));
var logger_1 = require("./config/logger");
var error_1 = require("./controllers/error");
var http_1 = __importDefault(require("http"));
var app = (0, express_1.default)();
var errorController = new error_1.ErrorController();
app.use((0, cors_1.default)());
var server = new http_1.default.Server(app);
var io = require("socket.io")(server);
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, logger_1.expressLogger)());
app.use(express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.use(index_1.default);
io.on("connection", function (socket) {
    // sio(io, socket)
});
app.get("/status", function (req, res) {
    res.json({
        stauts: "OK"
    });
});
app.use(errorController.hanle);
exports.default = app;
