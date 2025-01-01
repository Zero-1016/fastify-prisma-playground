import { registerSchema } from "../../schema";
import type { TAuthBody } from "../../schema/types";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authservice from "../../services/authservice";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../lib/constants";
import { handlerError } from "../../lib/errorHelper";

const authRoute = async (fastify: FastifyInstance) => {
  fastify.post('/register', {schema: registerSchema}, async (req:FastifyRequest<{Body: TAuthBody}>, rep: FastifyReply)=>{
    const { email, pwd } = req.body;
    
    try {
        await authservice.register(email, pwd);
        rep.status(SUCCESS_MESSAGE.registerOk.status).send(SUCCESS_MESSAGE.registerOk)
      } catch (error) {        
        handlerError(rep, ERROR_MESSAGE.badRequest, error)
    }
  })
}

export default authRoute;