import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';
import routes from './routes';
import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { SECRET_KEY } from './lib/constants';

const fastify = Fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifyCookie, {
    secret: SECRET_KEY
} as FastifyCookieOptions)

fastify.register(routes)

const start = async () => {
    try {
        await fastify.listen({port: 8083})
        console.log('listening on port 8083');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();