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
exports.LoginController = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var main_1 = require("../storage/main");
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var jwt_1 = require("../config/jwt");
var appError_1 = __importDefault(require("../utils/appError"));
var LoginController = /** @class */ (function () {
    function LoginController() {
        var _this = this;
        this.findOne = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _users, decrypt, _id, user, isValidPassword, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_1.storage.user.find({})];
                    case 1:
                        _users = _a.sent();
                        decrypt = function (data) {
                            return crypto_js_1.default.enc.Base64.parse(data).toString(crypto_js_1.default.enc.Utf8);
                        };
                        _users.forEach(function (user) {
                            var email = decrypt(user.email);
                            if (email === req.body.email)
                                _id = user._id;
                        });
                        return [4 /*yield*/, main_1.storage.user.findOne({ _id: _id })];
                    case 2:
                        user = _a.sent();
                        isValidPassword = bcrypt_1.default.compareSync(req.body.password, user.password);
                        if (!isValidPassword)
                            return [2 /*return*/, next(new appError_1.default(403, "password"))];
                        return [4 /*yield*/, (0, jwt_1.generateToken)({ _id: user._id })];
                    case 3:
                        token = _a.sent();
                        res.status(201).json({ success: true, token: token });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    return LoginController;
}());
exports.LoginController = LoginController;
