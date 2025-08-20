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
exports.CreateBlogService = CreateBlogService;
const blogRepo_1 = require("../repo/blogRepo");
function CreateBlogService(blogData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blog = yield (0, blogRepo_1.CreateBlogRepo)(blogData);
            if (!blog) {
                throw new Error("error in create blog service");
            }
            return blog;
        }
        catch (e) {
            console.log("error in create blog service", e);
            throw e;
        }
    });
}
