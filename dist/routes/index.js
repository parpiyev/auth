"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var otp_1 = __importDefault(require("./otp"));
var user_1 = __importDefault(require("./user"));
var login_1 = __importDefault(require("./login"));
var sample_1 = __importDefault(require("./sample"));
var express_1 = __importStar(require("express"));
var router = (0, express_1.Router)({ mergeParams: true });
router.use("/otp", otp_1.default);
router.use("/user", user_1.default);
router.use("/login", login_1.default);
router.use("/sample", sample_1.default);
router.use("/api/file", express_1.default.static(path_1.default.join(__dirname, "../", "uploads")));
exports.default = router;
