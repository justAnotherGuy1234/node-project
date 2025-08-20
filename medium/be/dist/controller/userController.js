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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = signUpController;
exports.loginController = loginController;
const userService_1 = require("../service/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setCookie_1 = __importDefault(require("../util/setCookie"));
const jwtSecret = process.env.JWT_SECRET;
function signUpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password, profilePic } = req.body;
            const user = yield (0, userService_1.CreateUserService)({ username, email, password, profilePic });
            if (!user) {
                return res.status(400).json("failed to create user");
            }
            return res.json({
                msg: "user created successfully",
                data: user
            });
        }
        catch (e) {
            console.log("error in sign up controller", e);
            return res.status(500).json("Internal server error");
        }
    });
}
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!jwtSecret) {
                console.log("error getting jwt in login method");
                throw new Error("Internal server error");
            }
            const user = yield (0, userService_1.LoginUserService)({ email, password });
            if (!user) {
                return res.status(500).json('Failed to login user');
            }
            const token = jsonwebtoken_1.default.sign({ email: user.email }, jwtSecret, { expiresIn: "1h" });
            (0, setCookie_1.default)(res, token);
            return res.json({
                "msg": "user login successfull",
                "data": user
            });
        }
        catch (e) {
            console.log("error in sign up controller", e);
            return res.status(500).json("Internal server error");
        }
    });
}
