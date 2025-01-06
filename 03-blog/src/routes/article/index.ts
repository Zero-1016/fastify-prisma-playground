import { FastifyInstance , FastifyRequest, FastifyReply } from "fastify";
import { createArticleSchema, updateArticleSchema } from "../../schema/articleSchema";
import { TCommonHeaders, TCommonBody } from "../../schema/types";
import { handlerError } from "../../lib/errorHelper";
import { ERROR_MESSAGE } from "../../lib/constants";
import articleService from "../../services/articleService";
import { verifySignIn } from "../../lib/authHelper";

const articleRoute = (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        schema: createArticleSchema,
        url: '/',
        preHandler: [verifySignIn],
        handler: async (req: FastifyRequest<{ Headers: TCommonHeaders, Body: TCommonBody }>, res: FastifyReply) => {
            const { content } = req.body
            const userId = req.user!.id
            const email = req.user!.email

            try {
                const result = await articleService.createdArticle(userId, email, content)
                res.status(200).send(result)
            }catch(error){
                handlerError(res, error)
            }
        }
    })

    fastify.route({
        method: 'PUT',
        schema: updateArticleSchema,
        url: '/:id',
        preHandler: [verifySignIn],
        handler: async (req: FastifyRequest<{ Headers: TCommonHeaders, Body: TCommonBody }>, res: FastifyReply) => {
            const { content, articleId } = req.body
            const userId = req.user!.id
            const email = req.user!.email

            try {
                const result = await articleService.updateArticle(articleId, userId, content, email)
                res.status(200).send(result)
            }catch(error){
                handlerError(res, ERROR_MESSAGE.badRequest, error)
            }
        }
    })
}

export default articleRoute;