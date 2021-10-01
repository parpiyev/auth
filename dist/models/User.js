"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var uuid_1 = require("uuid");
var roles = {
    user: {
        name: "user",
        operations: ['user']
    }
};
var userSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        default: uuid_1.v4
    },
    last_name: {
        type: String
    },
    first_name: {
        type: String
    },
    age: {
        type: String
    },
    photo: {
        type: Array
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    time: {
        type: String,
    },
    role: {
        type: Object,
        default: roles.user
    },
    count_views: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("User", userSchema);
