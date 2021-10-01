"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var express_1 = require("express");
var hasPermission_1 = require("../middleware/hasPermission");
var user_1 = require("../controllers/user");
var user_2 = require("../validators/user");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, '../', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".png");
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
var router = (0, express_1.Router)({ mergeParams: true });
var controller = new user_1.UserController();
var validator = new user_2.UserValidator();
router.route("/").get((0, hasPermission_1.hasPermission)('user'), controller.getAll).post(upload.array('photo', 1), controller.create);
router
    .route("/:id")
    .get((0, hasPermission_1.hasPermission)('user'), controller.get)
    .patch((0, hasPermission_1.hasPermission)('user'), controller.update)
    .delete((0, hasPermission_1.hasPermission)('user'), controller.delete);
exports.default = router;
