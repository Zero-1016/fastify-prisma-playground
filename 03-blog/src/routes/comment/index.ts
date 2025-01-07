import type { FastifyInstance } from "fastify";
import { verifySignIn } from "../../lib/authHelper";
import {verifyCommentUser} from "../../lib/commentHelper"
import { createCommentSchema, readCommentSchema, deleteCommentSchema } from "../../schema";
import commentController from "../../controller/commentController";

const commentRoute = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        schema: createCommentSchema,
        url: '/',
        preHandler: [verifySignIn],
        handler: commentController.createComment
    })

    fastify.route({
        method: 'GET',
        schema: readCommentSchema,
        url: '/:articleId',
        handler: commentController.readComment
    })

    fastify.route({
        method: 'DELETE',
        schema: deleteCommentSchema,
        url: '/',
        preHandler: [verifySignIn, verifyCommentUser],
        handler: commentController.deleteComment
    })
}

export default commentRoute;
