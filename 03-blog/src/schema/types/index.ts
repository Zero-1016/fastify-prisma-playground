import { Static } from "@sinclair/typebox";
import { authBodySchema } from "../authSchema";
import { commonBodySchema, commonHeaderSchema, articleSchema, commonParamsSchema } from "../commonSchema";

type TAuthBody = Static<typeof authBodySchema>
type TCommonHeaders = Static<typeof commonHeaderSchema>
type TCommonBody = Static<typeof commonBodySchema>
type TCommonParams = Static<typeof commonParamsSchema>
type TArticle = Static<typeof articleSchema>

export {
    TAuthBody,
    TCommonHeaders,
    TCommonBody,
    TArticle,
    TCommonParams
}