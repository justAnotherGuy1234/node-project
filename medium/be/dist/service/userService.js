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
exports.CreateUserService = CreateUserService;
exports.LoginUserService = LoginUserService;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const userRepo_1 = require("../repo/userRepo");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function CreateUserService(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
            userData.password = hashedPassword;
            if (userData.profilePic) {
                const uploadImage = yield cloudinaryConfig_1.default.uploader.upload(userData.profilePic);
                userData.profilePic = uploadImage.secure_url;
            }
            const user = yield (0, userRepo_1.CreateUserRepo)(userData);
            if (!user) {
                console.log("error in create user service");
                throw new Error("error creating new user");
            }
            return user;
        }
        catch (e) {
            console.log("error in create user service", e);
            throw e;
        }
    });
}
function LoginUserService(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userRepo_1.GetUserByEmail)(userData.email);
            if (!user) {
                throw new Error("error getting user by email ");
            }
            const verifyPassword = yield bcryptjs_1.default.compare(userData.password, user.password);
            if (!verifyPassword) {
                throw new Error("incorrect credentials");
            }
            return user;
        }
        catch (e) {
        }
    });
}
