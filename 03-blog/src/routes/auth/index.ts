import { registerSchema } from "../../schema";
import type { TAuthBody } from "../../schema/types";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const authRoute = async (fastify: FastifyInstance) => {
  fastify.post('/register', {schema: registerSchema}, async (req:FastifyRequest<{Body: TAuthBody}>, rep: FastifyReply)=>{
    return {
      status: 201,
      success: true,
      message: 'User registered successfully',
    }
  })
}