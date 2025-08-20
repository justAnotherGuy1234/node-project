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
exports.ProtectedRoute = ProtectedRoute;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepo_1 = require("./repo/userRepo");
const jwtSecret = process.env.JWT_SECRET;
function ProtectedRoute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cookie = req.cookies.token;
            if (!cookie) {
                return res.status(400).json("no cookies found");
            }
            if (!jwtSecret) {
                console.log("failed to get jwt from env in protected routes");
                return;
            }
            const verifyToken = jsonwebtoken_1.default.verify(cookie, jwtSecret);
            if (!verifyToken) {
                return res.status(400).json("incorrect token login again");
            }
            const email = verifyToken.email;
            const user = yield (0, userRepo_1.GetUserByEmail)(email);
            if (!user) {
                console.log("failed to get user from get user email in protected routes");
                return;
            }
            req.user = user;
            next();
        }
        catch (e) {
            console.log("error in protected routes", e);
            return res.status(500).json("Internal server error");
        }
    });
}
