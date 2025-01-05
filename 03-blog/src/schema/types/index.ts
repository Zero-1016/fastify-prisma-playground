import { Static } from "@sinclair/typebox";
import { authBodySchema } from "../authSchema";
import { commonHeaderSchema } from "../commonSchema";

type TAuthBody = Static<typeof authBodySchema>
type TCommonHeaders = Static<typeof commonHeaderSchema>

export {
    TAuthBody,
    TCommonHeaders
}