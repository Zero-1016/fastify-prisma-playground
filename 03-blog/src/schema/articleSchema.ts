import { Type } from "@sinclair/typebox";
import { articleSchema, commonHeaderSchema } from "./commonSchema";

const headers = commonHeaderSchema

const createArticleSchema = {
    headers,
    body: Type.Object({
        content: Type.String()
    }),
    response : {
        200: articleSchema
    }
}

export {
    createArticleSchema
}