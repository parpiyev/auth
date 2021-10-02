"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
var jwt_1 = require("../config/jwt");
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var main_1 = require("../storage/main");
var appError_1 = __importDefault(require("../utils/appError"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var OtpController = /** @class */ (function () {
    function OtpController() {
        var _this = this;
        this.create = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, code, token, otp, response, code_1, main;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, code = _a.code;
                        return [4 /*yield*/, main_1.storage.otp.findOne({ email: email })];
                    case 1:
                        otp = _b.sent();
                        if (!!otp) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, node_fetch_1.default)("https://api.antideo.com/email/" + email, {
                                headers: {
                                    apiKey: "86c3f9469a235e786021356e078e4fcf",
                                    "Content-Type": "application/json"
                                }
                            })];
                    case 2:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        response = _b.sent();
                        if (response.free_provider !== true)
                            return [2 /*return*/, next(new appError_1.default(401, 'email'))];
                        code_1 = Math.floor(100000 + Math.random() * 900000);
                        return [4 /*yield*/, main_1.storage.otp.create({ email: email, code: code_1 })];
                    case 4:
                        _b.sent();
                        main = function (email) { return __awaiter(_this, void 0, void 0, function () {
                            var transporter;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        transporter = nodemailer_1.default.createTransport({
                                            service: 'mail.ru',
                                            auth: {
                                                user: "parpiyev98@mail.ru",
                                                pass: "M199820j"
                                            }
                                        });
                                        return [4 /*yield*/, transporter.sendMail({
                                                from: 'parpiyev98@mail.ru',
                                                to: email,
                                                subject: "Code",
                                                html: "<h1>" + code_1 + "</h1>"
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        main(email);
                        return [3 /*break*/, 8];
                    case 5:
                        if (!(code !== otp.code)) return [3 /*break*/, 6];
                        return [2 /*return*/, next(new appError_1.default(400, 'sms'))];
                    case 6: return [4 /*yield*/, (0, jwt_1.generateToken)(email)];
                    case 7:
                        token = _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/, res.status(200).json({ success: true, token: token })];
                }
            });
        }); });
    }
    return OtpController;
}());
exports.OtpController = OtpController;
