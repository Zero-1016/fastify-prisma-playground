import db from "./db";

const verifyArticle = async (articleId:number, userId:number) => {
    let result = false;

    try {
        const article = await db.article.findUnique({
            where: {
                id: articleId
            }
        })

        if(article){
            result = article.userId === userId ? true : false
        }

        return result
    } catch (error) {
        throw error
    }
}

export {
    verifyArticle
}