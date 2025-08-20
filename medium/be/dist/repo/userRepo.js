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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRepo = CreateUserRepo;
exports.GetUserByEmail = GetUserByEmail;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function CreateUserRepo(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({ where: { email: userData.email } });
            if (user) {
                throw new Error("user with email already exists");
            }
            const newUser = yield prisma.user.create({ data: {
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    profilePic: userData.profilePic
                } });
            if (!newUser) {
                throw new Error("error creating new user");
            }
            return newUser;
        }
        catch (e) {
            console.log("error in create user repo", e);
            throw e;
        }
    });
}
function GetUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({ where: { email: email } });
            if (!user) {
                throw new Error("no user found with this email");
            }
            return user;
        }
        catch (e) {
            console.log("error in get user by email", e);
            throw e;
        }
    });
}
