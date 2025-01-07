import { FastifyInstance } from "fastify";
import authRoute from "./auth";
import articleRoute from "./article";
import commentRoute from "./comment";

const routes = async (fastify: FastifyInstance) => {
    await fastify.register(authRoute, {prefix: "/auth"})
    await fastify.register(articleRoute, {prefix: "/articles"})
    await fastify.register(commentRoute, {prefix: "/comments"})
}

export default routes;
