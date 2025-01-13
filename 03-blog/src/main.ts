import 'dotenv/config'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';
import routes from './routes';
import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { SECRET_KEY } from './lib/constants';
import { currentAuthPlugin } from './plugin/authPlugin';
import { checkStartupArticle, checkStartupUser } from './startup';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { swaggerConfig, swaggerUiConfig } from './config/swagger'
import fs from 'fs'

const fastify = Fastify({
    logger: true,
    https: {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt')
    }
}).withTypeProvider<TypeBoxTypeProvider>();


fastify.register(currentAuthPlugin)
fastify.register(routes)
fastify.register(cors, {
    origin: true, // 모든 출처 허용
    credentials: true // 프론트엔드에서 axios나 fetch 사용 시 withCredentials: true 설정 필요
})

fastify.register(fastifySwagger, swaggerConfig)
fastify.register(fastifySwaggerUi, swaggerUiConfig)

fastify.register(fastifyCookie, {
    secret: SECRET_KEY,
} as FastifyCookieOptions)

const start = async () => {
    try {
        await checkStartupUser()
        await checkStartupArticle()
        await fastify.listen({port: 8083})
        console.log('listening on port 8083');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();