"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var otp_1 = require("../controllers/otp");
var router = (0, express_1.Router)({ mergeParams: true });
var opt = new otp_1.OtpController();
router.route("/").post(opt.create);
exports.default = router;
