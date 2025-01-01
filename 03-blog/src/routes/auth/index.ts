import { loginSchema, registerSchema } from "../../schema";
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

  fastify.post('/login', {schema: loginSchema}, async (req:FastifyRequest<{Body: TAuthBody}>, rep: FastifyReply)=>{
    const {email, pwd } = req.body;

    try {
        const values = await authservice.loginWithPassword(email, pwd);
        
        rep.setCookie('refresh_token', values.refreshToken, {
            domain: 'localhost',
            sameSite: 'none',
            secure: true,
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })

        const result = {
            id: values.id,
            email: values.email,
            Authorization: values.accessToken
        }

        rep.status(SUCCESS_MESSAGE.loginOk.status).send(result)
    } catch (err) {
        handlerError(rep, ERROR_MESSAGE.badRequest, err)
    }
  })
}

export default authRoute;