import db from "../lib/db"
import { getCurrentDate } from "../lib/timeHelper"
import { TComment } from "../schema/types"

function commentService() {
    const createComment = async (articleId: number, content: string, userId: number, userEmail: string) => {
        try {
            const values = {
                content,
                userId,
                articleId,
                createComment: getCurrentDate(),
            }

            const result = await db.comment.create({
                data: values
            })

            const newCommnet = {
                ...result,
                userId,
                userEmail
            }

            await db.article.update({
                where: {
                    id: articleId
                },
                data: {
                    commentCount: {
                        increment: 1
                    }
                }
            })

            return newCommnet;
        } catch (error) {
            throw error;
        }
    }

    const readComment = async (articleId: number) => {
        try {
            const comments = await db.comment.findMany({
                where: {
                    articleId
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true
                        }
                    }
                }
            })

            let flattenComments: TComment[] = comments.map(comment => {
                return {
                    ...comment,
                    userEmail: comment.user.email,
                    createdAt: comment.createdAt.toISOString()
                }
            })

            return {
                comments: flattenComments
            };
        } catch (error) {
            throw error;
        }
    }

    const deleteComment = async (articleId: number, commentId: number, userId: number) => {
        try {
            const result = await db.comment.delete({
                where: {
                    id: commentId,
                }
            })

            await db.article.update({
                where: {
                    id: articleId
                },
                data: {
                    commentCount: {decrement: 1}
                }
            })
        } catch (error) {
            throw error;
        }
    }

    return {
        createComment,
        readComment,
        deleteComment   
    }
}

export default commentService();