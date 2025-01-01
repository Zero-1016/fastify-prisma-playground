import { FastifyReply } from "fastify";

export function handlerError(rep: FastifyReply, errorType: {success: boolean, status: number, message: string}, error?: any){
    rep.log.error(error)
    rep.status(errorType.status).send(errorType)
}