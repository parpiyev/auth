"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = require("../config/logger");
var config_1 = __importDefault(require("../config/config"));
var db = mongoose_1.default.connection;
db.on("error", function () {
    logger_1.logger.error("DB: mongo db connection is not open");
    logger_1.logger.info("DB: killing myself so that container restarts");
});
db.once("open", function () {
    logger_1.logger.info("DB: mongo db connection is established");
});
function getMongoDBUrl(auth, dbInfo) {
    var url;
    if (auth) {
        return "mongodb+srv://admin:admin123@cluster0.py9oo.mongodb.net/auth?retryWrites=true&w=majority";
    }
    url =
        "mongodb://" +
            config_1.default.MongoUser +
            ":" +
            config_1.default.MongoPassword +
            "@" +
            config_1.default.MongoHost +
            ":" +
            config_1.default.MongoPort.toString() +
            "/" +
            config_1.default.MongoDatabase;
    return url;
}
var Database = /** @class */ (function () {
    function Database() {
        this.url = getMongoDBUrl(false, {
            database: config_1.default.MongoDatabase,
            host: config_1.default.MongoHost,
            password: config_1.default.MongoPassword,
            port: config_1.default.MongoPort,
            username: config_1.default.MongoUser
        });
        if (config_1.default.MongoAuthDisable) {
            this.url = getMongoDBUrl(config_1.default.MongoAuthDisable);
        }
        logger_1.logger.info("DB: DATABASE URL: " + this.url);
    }
    Database.prototype.connect = function () {
        return mongoose_1.default.connect(this.url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }, function (error) {
            if (error) {
                logger_1.logger.error("DB: MongoDB Connection error:", error);
                process.exit(1);
            }
        });
    };
    return Database;
}());
exports.default = Database;
