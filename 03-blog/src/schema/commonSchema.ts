import { Type } from "@sinclair/typebox"

const commonHeaderSchema = Type.Object({
    authorization: Type.Optional(Type.String())
})

const commonBodySchema = Type.Object({
    articleId: Type.Number(),
    content: Type.String()
})

const articleSchema = Type.Object({
    id: Type.Number(),
    content: Type.String(),
    likeCount: Type.Number(),
    commentCount: Type.Number(),
    userId: Type.Number(),
    userEmail: Type.Optional(Type.String()),
    likeMe: Type.Optional(Type.Boolean()),
    createAt: Type.String(),
})

export {
    commonHeaderSchema,
    articleSchema,
    commonBodySchema
}