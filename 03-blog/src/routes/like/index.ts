import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { verifySignIn } from "../../lib/authHelper";
import { addLikeSchema, cancleLikeSchema, readLikeSchema } from "../../schema";
import { TCommonHeaders, TCommonQuery, TCommonParam } from "../../schema/types";
import { handleError } from "../../lib/errorHelper";
import { ERROR_MESSAGE } from "../../lib/constants";
import likeService from "../../services/likeService";

const likeRoute = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        schema: addLikeSchema,
        url: '/add/:articleId',
        preHandler: [verifySignIn],
        handler: async (req: FastifyRequest<{Headers: TCommonHeaders, Params: TCommonParam}>, rep: FastifyReply) => {
            const {articleId} = req.params;
            const userId = req.user!.id;
        
            
            try {
                const result = await likeService.addLike(articleId, userId)
                rep.status(200).send(result)
            } catch(error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error)
            }
        }
    
    })
    
    fastify.route({
        method: 'GET',
        schema: readLikeSchema,
        url: '/',
        preHandler: [verifySignIn],
        handler: async (req: FastifyRequest<{Headers: TCommonHeaders, Params: TCommonParam, Querystring: TCommonQuery}>, rep: FastifyReply) => {
            const {pageNumber = 0} = req.query;
            const userId = req.user!.id;

            try {
                const result = await likeService.readLikes(pageNumber, userId)
                rep.status(200).send(result)
            } catch(error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error)
            }
        }
    })

    fastify.route({
        method: 'POST',
        schema: cancleLikeSchema,
        url: '/cancle/:articleId',
        preHandler: [verifySignIn],
        handler: async (req: FastifyRequest<{Headers: TCommonHeaders, Params: TCommonParam}>, rep: FastifyReply) => {
            const {articleId} = req.params;
            const userId = req.user!.id;

            try {
                const result = await likeService.cancleLike(articleId, userId)
                rep.status(200).send(result)
            } catch(error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error)
            }
        }
    })
}

export default likeRoute;