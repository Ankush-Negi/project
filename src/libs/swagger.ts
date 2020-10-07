import * as swaggerJSDoc from 'swagger-jsdoc';

const options: any = {
  apis: [
    'dist/**/*.js',
    './dist/libs/swagger.js',
    './dist/controllers/owner/routes.js',
    './dist/controllers/user/routes.js',
    './dist/controllers/productManager/routes.js',
    './dist/controllers/order/routes.js',
  ],
  swaggerDefinition: {
    basePath: '/api',
    info: {
      description: 'Test Api',
      swagger: '3.5.0',
      openApi: '3.0.0',
      title: 'My Api',
      version: '1.0.0'
    },
    securityDefinitions: {
      Bearer: {
        in: 'Headers',
        name: 'Authorization',
        type: 'apiKey'
      }
    },
    servers: ['http://localhost:9000'],
  }
};

const swaggerOptions = swaggerJSDoc(options);
export default swaggerOptions;