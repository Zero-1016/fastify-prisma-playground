import { verifyArticle } from "../lib/articleHelper"
import { ERROR_MESSAGE } from "../lib/constants"
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

    const updateArticle = async (articleId:number, userId:number, content:string, email:string) => {
        try {
            const checkVerifyUser = await verifyArticle(articleId, userId)

            if(!checkVerifyUser){
                throw ERROR_MESSAGE.badRequest
            }

            const result = await db.article.update({
                where: {
                    id: articleId
                },
                data: {
                    content
                }
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

    const deleteArticle = async (articleId:number, userId:number, email:string) => {
        try {
            const checkVerifyUser = await verifyArticle(articleId, userId)

            if(!checkVerifyUser){
                throw ERROR_MESSAGE.badRequest
            }

            const result = await db.article.delete({
                where: {
                    id: articleId
                }
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
        createdArticle,
        updateArticle,
        deleteArticle
    }
}

export default articleService()