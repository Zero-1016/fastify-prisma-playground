import 'dotenv/config'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';
import routes from './routes';
import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { SECRET_KEY } from './lib/constants';
import { currentAuthPlugin } from './plugin/authPlugin';
import { checkStartupArticle, checkStartupUser } from './startup';
import fs from 'fs';

const fastify = Fastify({
    logger: true,
    // https: {
    //     key: fs.readFileSync('./server.key'),
    //     cert: fs.readFileSync('./server.crt')
    // }
}).withTypeProvider<TypeBoxTypeProvider>();


fastify.register(currentAuthPlugin)
fastify.register(routes)

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