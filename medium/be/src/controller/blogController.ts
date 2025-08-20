import { Request, Response } from "express";
import { CreateBlogDto } from "../dto/blogDto";
import cloundinary from "../config/cloudinaryConfig";
import { CreateBlogService } from "../service/blogService";

export async function CreateBlogController(req: Request, res: Response): Promise<any> {
    try {

        let { blogTitle, blogHeroImage, blogContent, blogImage } = req.body

        const userId = req.user.id


        if (blogHeroImage) {
            const uploadImage = await cloundinary.uploader.upload(blogHeroImage)
            blogHeroImage = uploadImage.secure_url
        }

        if (blogImage && blogImage.length > 0 ) {
            const updatedImages = await Promise.all(
                blogImage.map(async (image: any) => {
                    const res = await cloundinary.uploader.upload(image)
                    return res.secure_url
                })
            )
            blogImage = updatedImages
        }

        const blogData: CreateBlogDto = {
            userId: userId,
            blogTitle: blogTitle,
            blogHeroImage: blogHeroImage,
            blogContent: blogContent,
            blogImage: blogImage
        }

        const newBlog = await CreateBlogService(blogData)


        if (!newBlog) {
            return res.status(400).json("failed to create ")
        }
    } catch (e) {
        console.log("error in creat blog controller", e)
        return res.status(500).json("Internal server error")
    }
}