import 'reflect-metadata';
import { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { config } from './config';
import { createExpressServer } from 'routing-controllers';
import { ContactController } from './controllers';
import { SecurityMiddleware, LogMiddleware } from './middleware';

const port: number = config.app.port;

const app: Application = createExpressServer({
  cors: true,
  classTransformer: true,
  routePrefix: '/api',
  defaultErrorHandler: false,

  controllers: [ContactController],
  middlewares: [SecurityMiddleware, LogMiddleware],
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
