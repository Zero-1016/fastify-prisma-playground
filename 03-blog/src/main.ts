import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';
import routes from './routes';

const fastify = Fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>();

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