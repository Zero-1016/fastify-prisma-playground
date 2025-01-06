import { Type } from "@sinclair/typebox";
import { articleSchema, commonHeaderSchema, commonBodySchema } from "./commonSchema";

const headers = commonHeaderSchema
const body = commonBodySchema

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

export {
    createArticleSchema,
    updateArticleSchema
}