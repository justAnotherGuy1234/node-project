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
exports.CreateBlogController = CreateBlogController;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const blogService_1 = require("../service/blogService");
function CreateBlogController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { blogTitle, blogHeroImage, blogContent, blogImage } = req.body;
            const userId = req.user.id;
            if (blogHeroImage) {
                const uploadImage = yield cloudinaryConfig_1.default.uploader.upload(blogHeroImage);
                blogHeroImage = uploadImage.secure_url;
            }
            if (blogImage && blogImage.length > 0) {
                const updatedImages = yield Promise.all(blogImage.map((image) => __awaiter(this, void 0, void 0, function* () {
                    const res = yield cloudinaryConfig_1.default.uploader.upload(image);
                    return res.secure_url;
                })));
                blogImage = updatedImages;
            }
            const blogData = {
                userId: userId,
                blogTitle: blogTitle,
                blogHeroImage: blogHeroImage,
                blogContent: blogContent,
                blogImage: blogImage
            };
            const newBlog = yield (0, blogService_1.CreateBlogService)(blogData);
            if (!newBlog) {
                return res.status(400).json("failed to create ");
            }
        }
        catch (e) {
            console.log("error in creat blog controller", e);
            return res.status(500).json("Internal server error");
        }
    });
}
