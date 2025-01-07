import db from "../lib/db";
import { ERROR_MESSAGE } from "../lib/constants";
import { TArticle } from "../schema/types";
import { error } from "console";

function likeService() {
    
    const addLike = async (articleId: number, userId: number) => {
        
        const values = {
            userId,
            articleId
        }

        try {
            const likeCheck = await db.like.count({
                where: {
                    userId,
                    articleId
                }
            })

            if(likeCheck === 0) {
                await db.like.create({
                    data: values
                })
            
                await db.article.update({
                    where: {
                        id: articleId
                    },
                    data: {
                        likeCount: {
                            increment: 1
                        }
                    }
                })
            } else {
                throw ERROR_MESSAGE.likeAddError;
            }

            return true;
        } catch (error) {
            throw ERROR_MESSAGE.likeAddError;
        }

    }

    const cancleLike = async (articleId: number, userId: number) => {
    
        try {
            const likeCheck = await db.like.count({
                where: {
                    userId,
                    articleId
                }
            })

            if(likeCheck > 0) {
                await db.like.deleteMany({
                    where: {
                        userId,
                        articleId
                    }
                })

                await db.article.update({
                    where: {
                        id: articleId
                    },
                    data: {
                        likeCount: {
                            decrement: 1
                        }
                    }
                })

                return true;
            } else {
                throw ERROR_MESSAGE.likeCancelError;
            }
        } catch (error) {
            throw ERROR_MESSAGE.likeCancelError;
        }
    }

    const readLikes = async (pageNumber:number, userId: number) => {
        const pageSize = 10;
        let skip = 0

        if(pageNumber > 1) skip = ((pageNumber - 1) * pageSize)

        try {
            const likeArticles = await db.like.findMany({
                where: {
                    userId
                },
                include: {
                    article: {
                        select: {
                            id: true,
                            content: true,
                            commentCount: true,
                            likeCount: true,
                            createdAt: true,
                            user: {
                                select: {
                                    id: true,
                                    email: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    id: 'desc'
                },
                skip,
                take: pageSize
            })

            const toalLikeCount = await db.like.count({
                where: {
                    userId
                }
            })

            const totalPageCount = Math.ceil(toalLikeCount /pageSize)

            let flattenArticles: TArticle[] = likeArticles.map(like => {
                return {
                    ...like.article,
                    createdAt: like.article.createdAt.toString(),
                    userId: like.article.user.id,
                    userEmail: like.article.user.email,
                    likeMe: true
                }
            })

            return {
                articleList: flattenArticles,
                totalPageCount
            }
        }catch(err) {
            throw error
        }
    }

    return {
        addLike,
        cancleLike,
        readLikes
    }
}

export default likeService();