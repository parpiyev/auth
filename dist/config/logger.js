"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLogger = exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var express_winston_1 = __importDefault(require("express-winston"));
var config_1 = __importDefault(require("./config"));
var levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};
var options = {
    format: winston_1.default.format.combine(winston_1.default.format.label({
        label: require("../../package.json").name
    }), winston_1.default.format.timestamp(), winston_1.default.format.splat(), winston_1.default.format.metadata({
        fillExcept: ["message", "level", "timestamp", "label"]
    }), winston_1.default.format.prettyPrint())
};
var consoleLogFormat = winston_1.default.format.printf(function (info) {
    return info.timestamp + " " + info.level + " [" + info.label + "]: " + info.message;
});
exports.logger = winston_1.default.createLogger(__assign(__assign({}, options), { transports: [
        new winston_1.default.transports.File({ filename: "logs/debug.log", level: "debug" }),
        new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" })
    ] }));
var expressLogger = function () {
    return express_winston_1.default.logger(__assign(__assign({}, options), { transports: [
            new winston_1.default.transports.Console({
                format: winston_1.default.format.combine(winston_1.default.format.colorize(), consoleLogFormat),
                level: "debug"
            }),
            new winston_1.default.transports.File({ filename: "logs/requests.log", level: "debug" })
        ], meta: true, msg: "{{req.method}}: {{res.statusCode}} {{res.responseTime}}ms {{req.url}}", colorize: true }));
};
exports.expressLogger = expressLogger;
if (config_1.default.NodeEnv !== "production") {
    exports.logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), consoleLogFormat),
        level: "debug"
    }));
}
