import Fastify from 'fastify';

const fastify = Fastify();

fastify.get('/ping', async (request, reply) => {
    return { message: 'pong' };
});

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