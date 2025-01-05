import { FastifyInstance , FastifyRequest, FastifyReply } from "fastify";
import { createArticleSchema } from "../../schema/articleSchema";
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
            }catch(error){
                handlerError(res, error)
            }
        }
    })
}

export default articleRoute;