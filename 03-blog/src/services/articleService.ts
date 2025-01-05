import db from "../lib/db"
import { getCurrentDate } from "../lib/timeHelper"
import { TArticle } from "../schema/types"

function articleService() {
    const createdArticle = async (id:number, email:string, content:string) => {

        try {
            const values = {
                content,
                userId: id,
                createAt: getCurrentDate()
            }

            const result = await db.article.create({
                data: values
            })

            const returnValues:TArticle = {
                ...result,
                userEmail: email,
                likeMe: false,
                createAt: result.createedAt.toString()
            }

            return returnValues
        } catch (error) {
            throw error
        }
    }

    return {
        createdArticle
    }
}

export default articleService()