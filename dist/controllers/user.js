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
exports.UserController = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var jwt_1 = require("../config/jwt");
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var main_1 = require("../storage/main");
var appError_1 = __importDefault(require("../utils/appError"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.getAll = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _users, users, decrypt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_1.storage.user.find({})];
                    case 1:
                        _users = _a.sent();
                        users = [];
                        decrypt = function (data) {
                            return crypto_js_1.default.enc.Base64.parse(data).toString(crypto_js_1.default.enc.Utf8);
                        };
                        _users.forEach(function (user) {
                            var lastName = decrypt(user.last_name);
                            var firstName = decrypt(user.first_name);
                            var _age = decrypt(user.age);
                            var _email = decrypt(user.email);
                            var photo;
                            if (user.photo.length > 0)
                                photo = decrypt(user.photo[0]);
                            users.push({
                                _id: user._id,
                                last_name: lastName,
                                first_name: firstName,
                                age: _age,
                                photo: user.photo.length > 0 ? [photo] : [],
                                email: _email,
                                time: user.time,
                                count_viewscount_views: user.count_views
                            });
                        });
                        res.status(200).json({ success: true, data: { users: users } });
                        return [2 /*return*/];
                }
            });
        }); });
        this.get = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user, decrypt, last_name, first_name, age, email, photo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_1.storage.user.findById(req.params.id)];
                    case 1:
                        user = _a.sent();
                        decrypt = function (data) {
                            return crypto_js_1.default.enc.Base64.parse(data).toString(crypto_js_1.default.enc.Utf8);
                        };
                        last_name = decrypt(user.last_name);
                        first_name = decrypt(user.first_name);
                        age = decrypt(user.age);
                        email = decrypt(user.email);
                        if (user.photo.length > 0)
                            photo = decrypt(user.photo[0]);
                        res.status(200).json({ success: true, data: { user: { _id: user._id, last_name: last_name, first_name: first_name, age: age, photo: user.photo.length > 0 ? [photo] : [], email: email, time: user.time, count_views: user.count_views } } });
                        return [2 /*return*/];
                }
            });
        }); });
        this.create = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _token, _a, last_name, first_name, age, email, password, photos, _i, _b, photo_1, encrypt, salt, hashPassword, last, first, lastName, firstName, _age, _email, photo, user, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, jwt_1.verifyToken)(req.headers.authorization)];
                    case 1:
                        _token = _c.sent();
                        _a = req.body, last_name = _a.last_name, first_name = _a.first_name, age = _a.age, email = _a.email, password = _a.password;
                        photos = [];
                        for (_i = 0, _b = req.files; _i < _b.length; _i++) {
                            photo_1 = _b[_i];
                            photos.push("/api/file/" + photo_1.filename);
                        }
                        encrypt = function (text) {
                            return crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.enc.Utf8.parse(text));
                        };
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 2:
                        salt = _c.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 3:
                        hashPassword = _c.sent();
                        if (/^[A-Z]+$/.test(last_name[0]) != true || /^[A-Z]+$/.test(first_name[0]) != true)
                            return [2 /*return*/, next(new appError_1.default(401, 'ism'))];
                        last = last_name.slice(1), first = first_name.slice(1);
                        if (/^[a-z]+$/.test(last) != true || /^[a-z]+$/.test(first) != true)
                            return [2 /*return*/, next(new appError_1.default(401, 'ism'))];
                        lastName = encrypt(last_name);
                        firstName = encrypt(first_name);
                        _age = encrypt(age);
                        _email = encrypt(email);
                        if (photos.length > 0)
                            photo = encrypt(photos[0]);
                        if (_token != email)
                            return [2 /*return*/, next(new appError_1.default(403, 'approved'))];
                        return [4 /*yield*/, main_1.storage.user.create({
                                last_name: lastName,
                                first_name: firstName,
                                age: _age,
                                photo: photo && photo.length > 0 ? [photo] : [],
                                email: _email,
                                password: hashPassword
                            })];
                    case 4:
                        user = _c.sent();
                        return [4 /*yield*/, (0, jwt_1.generateToken)(user._id)];
                    case 5:
                        token = _c.sent();
                        res.status(201).json({ success: true, token: token });
                        return [2 /*return*/];
                }
            });
        }); });
        this.update = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, last_name, first_name, age, email, password, new_password, _user, hashPassword, userPhoto, photos, _i, _b, photo_2, encrypt, isValidPassword, salt, last, first, lastName, firstName, _age, _email, photo, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, last_name = _a.last_name, first_name = _a.first_name, age = _a.age, email = _a.email, password = _a.password, new_password = _a.new_password;
                        return [4 /*yield*/, main_1.storage.user.findById(req.params.id)];
                    case 1:
                        _user = _c.sent();
                        if (_user.photo.length > 0) {
                            _user.photo.forEach(function (element) {
                                userPhoto = element.trim().split("/api/file/").pop();
                            });
                            fs_1.default.unlink(path_1.default.join(__dirname, "../", "uploads", userPhoto), function (err) {
                                if (err)
                                    return err;
                            });
                        }
                        photos = [];
                        for (_i = 0, _b = req.files; _i < _b.length; _i++) {
                            photo_2 = _b[_i];
                            photos.push("/api/file/" + photo_2.filename);
                        }
                        encrypt = function (text) {
                            return crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.enc.Utf8.parse(text));
                        };
                        if (!new_password) return [3 /*break*/, 4];
                        isValidPassword = bcrypt_1.default.compareSync(password, _user.password);
                        if (!isValidPassword)
                            return [2 /*return*/, next(new appError_1.default(403, "passsword"))];
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 2:
                        salt = _c.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(new_password, salt)];
                    case 3:
                        hashPassword = _c.sent();
                        _c.label = 4;
                    case 4:
                        if (/^[A-Z]+$/.test(last_name[0]) != true || /^[A-Z]+$/.test(first_name[0]) != true)
                            throw new appError_1.default(401, 'ism');
                        last = last_name.slice(1), first = first_name.slice(1);
                        if (/^[a-z]+$/.test(last) != true || /^[a-z]+$/.test(first) != true)
                            throw new appError_1.default(401, 'ism');
                        lastName = encrypt(last_name);
                        firstName = encrypt(first_name);
                        _age = encrypt(age);
                        _email = encrypt(email);
                        if (photos.length > 0)
                            photo = encrypt(photos[0]);
                        return [4 /*yield*/, main_1.storage.user.update(req.params.id, {
                                last_name: lastName,
                                first_name: firstName,
                                age: _age,
                                photo: photo.length > 0 ? [photo] : [],
                                email: _email,
                                password: hashPassword
                            })];
                    case 5:
                        user = _c.sent();
                        res.status(200).json({ success: true, data: { user: { _id: user._id, last_name: last_name, first_name: first_name, age: age, photo: photos, email: email, } } });
                        return [2 /*return*/];
                }
            });
        }); });
        this.delete = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_1.storage.user.delete(req.params.id)];
                    case 1:
                        _a.sent();
                        res.status(204).json({ success: true, data: null });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    return UserController;
}());
exports.UserController = UserController;
