import { marked } from "marked"
import sanitizeHtml from "sanitize-html"
import TurnDownService from "turndown"

export async function sanitize(markdown : string) {
    if(!markdown || typeof markdown != "string"){
        console.log("markdown is empty or not type of string")
        return ""
    }

    try {
        const convertHtml = await marked.parse(markdown) 

        console.log("converted html" , convertHtml)

        const sanitize = sanitizeHtml(convertHtml , {
            allowedTags : sanitizeHtml.defaults.allowedTags.concat(["img" , "pre" , "code"]),
            allowedAttributes : {
                ...sanitizeHtml.defaults.allowedAttributes ,
                "img" : ["src"  , "target" , "alt"],
                "pre" : ["class"],
                "code" : ["class"],
                "a" : ["href" , "target"]
            },
            allowedSchemes : ["http" , "https"],
            allowedSchemesByTag : {
                "img" : ["http" , "https"]
            }
        })

        console.log("sanitize" , sanitize)

        const tds = new TurnDownService({
            headingStyle : 'atx'
        })
    
        
        const res =  tds.turndown(sanitize)

        console.log("res" , res)

        return res

    } catch (e) {
        console.log("error in sanitizing markdown" , e)
       return "" 
    }
}