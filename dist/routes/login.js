"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = require("../controllers/login");
var login_2 = require("../validators/login");
var router = (0, express_1.Router)({ mergeParams: true });
var controller = new login_1.LoginController();
var validator = new login_2.LoginValidator();
router.route("/").post(controller.findOne);
exports.default = router;
