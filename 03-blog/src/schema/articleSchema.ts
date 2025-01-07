import { Type } from "@sinclair/typebox";
import { articleSchema, commonHeadersSchema, commonBodySchema, commonParamSchema, commonPagenationSchema, commonQuerySchema } from "./commonSchema";

const headers = commonHeadersSchema
const body = commonBodySchema
const params = commonParamSchema
const queryString = commonQuerySchema

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

const readArticleOneSchema = {
    params,
    response : {
        200: articleSchema
    }
}

const readArticlesSchema = {
    headers,
    queryString,
    response : {
        200: commonPagenationSchema
    }
}

export {
    createArticleSchema,
    updateArticleSchema,
    deleteArticleSchema,
    readArticleOneSchema,
    readArticlesSchema
}