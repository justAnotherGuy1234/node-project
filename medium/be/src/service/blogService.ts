import { CreateBlogDto } from "../dto/blogDto";
import { CreateBlogRepo } from "../repo/blogRepo";

export async function CreateBlogService(blogData : CreateBlogDto) {
    try {
       const blog = await CreateBlogRepo(blogData) 


       if (!blog){
        throw new Error("error in create blog service" )
       }

       return blog
    } catch (e) {
      console.log("error in create blog service" , e)  
      throw e
    }
}