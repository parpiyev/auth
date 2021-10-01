"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
var otp_1 = require("./mongo/otp");
var user_1 = require("./mongo/user");
var sample_1 = require("./mongo/sample");
exports.storage = {
    otp: new otp_1.OTPStorage(),
    user: new user_1.UserStorage(),
    sample: new sample_1.SampleStorage(),
};
