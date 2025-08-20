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
exports.CreateBlogRepo = CreateBlogRepo;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function CreateBlogRepo(blogData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let imageUrl = [];
            if (blogData.blogImage) {
                imageUrl = blogData.blogImage.map((image) => ({
                    url: image
                }));
            }
            const blog = yield prisma.blog.create({
                data: {
                    userId: blogData.userId,
                    blogTitle: blogData.blogTitle,
                    blogHeroImage: blogData.blogHeroImage,
                    blogContent: blogData.blogContent,
                    blogImage: { createMany: { data: imageUrl } },
                },
                include: { blogImage: true }
            });
            if (!blog) {
                throw new Error("failed to create new blog");
            }
            return blog;
        }
        catch (e) {
            console.log("error in create blog repo", e);
            throw e;
        }
    });
}
