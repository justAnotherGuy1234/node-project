import { PrismaClient } from "@prisma/client";
import { CreateBlogDto } from "../dto/blogDto";

const prisma = new PrismaClient()

export async function CreateBlogRepo(blogData: CreateBlogDto) {
    try {
        let imageUrl: {url : string}[] = []
        
        if (blogData.blogImage) {
            imageUrl = blogData.blogImage.map((image) => ({
                url: image
            }))
        }

        const blog = await prisma.blog.create({
            data: {
                userId: blogData.userId,
                blogTitle: blogData.blogTitle,
                blogHeroImage: blogData.blogHeroImage,
                blogContent: blogData.blogContent,
                blogImage: { createMany: {data : imageUrl } },
            },
            include: { blogImage: true }
        })

        if (!blog) {
            throw new Error("failed to create new blog")
        }

        return blog

    } catch (e) {
        console.log("error in create blog repo", e)
        throw e
    }
}