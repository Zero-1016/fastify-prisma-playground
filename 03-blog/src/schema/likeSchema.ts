import { Type } from "@sinclair/typebox";
import { commonHeadersSchema, commonParamSchema, commonQuerySchema, commonPagenationSchema } from "./commonSchema";

const headers = commonHeadersSchema
const queryString = commonQuerySchema
const params = commonParamSchema

const addLikeSchema = {
    headers,
    params,
    response: {
        200: Type.Boolean()
    }
}

const cancleLikeSchema = {
    headers,
    params,
    response: {
        200: Type.Boolean()
    }
}

const readLikeSchema = {
    headers,
    params,
    response: {
        200: commonPagenationSchema
    }
}

export {
    addLikeSchema,
    cancleLikeSchema,
    readLikeSchema
}