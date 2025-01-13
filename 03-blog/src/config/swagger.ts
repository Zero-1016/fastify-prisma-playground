import { FastifySwaggerUiOptions } from "@fastify/swagger-ui"


const swaggerConfig = {
    swagger: {
        info: {
            title: 'Blog API',
            description: 'Blog API Documentation',
            version: '1.0.0'
        },
        host: 'localhost:8083',
        basePath: '/',
    }
}

const swaggerUiConfig: FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
    }
}

export { swaggerConfig, swaggerUiConfig }