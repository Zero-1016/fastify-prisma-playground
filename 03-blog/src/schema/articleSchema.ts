import { Type } from "@sinclair/typebox";
import { articleSchema, commonHeaderSchema, commonBodySchema, commonParamsSchema } from "./commonSchema";

const headers = commonHeaderSchema
const body = commonBodySchema
const params = commonParamsSchema

const createArticleSchema = {
    headers,
    body: Type.Object({
        content: Type.String()
    }),
    response : {
        200: articleSchema
    }
}

const updateArticleSchema = {
    headers,
    body,
    response : {
        200: articleSchema
    }
}

const deleteArticleSchema = {
    headers,
    params,
    response : {
        200: articleSchema
    }
}

export {
    createArticleSchema,
    updateArticleSchema,
    deleteArticleSchema
}