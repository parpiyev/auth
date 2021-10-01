"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    HttpPort: getConf("PORT", "3000"),
    MongoHost: getConf("MONGO_HOST", "localhost"),
    MongoPort: parseInt(getConf("MONGO_PORT", "27017")),
    MongoDatabase: getConf("MONGO_DATABASE", "sample_project"),
    MongoPassword: getConf("MONGO_PASSWORD", ""),
    MongoUser: getConf("MONGO_USER", ""),
    NodeEnv: getConf("NODE_ENV", "development"),
    JwtSecret: getConf('JwtSecret', '12345'),
    MongoAuthDisable: true
};
console.log(config.JwtSecret);
function getConf(name, def) {
    if (def === void 0) { def = ""; }
    if (process.env[name]) {
        return process.env[name] || "";
    }
    return def;
}
exports.default = config;
