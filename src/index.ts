import 'reflect-metadata';
import { Application } from 'express';
import { config } from './config';
import { createExpressServer } from 'routing-controllers';
import { ContactController } from './controllers';
import { SecurityMiddleware, LogMiddleware } from './middleware';
import { DB } from './database';

const port: number = config.app.port;

const app: Application = createExpressServer({
  cors: true,
  classTransformer: true,
  routePrefix: config.app.routePrefix,
  defaultErrorHandler: true,

  controllers: [ContactController],
  middlewares: [SecurityMiddleware, LogMiddleware],
});

DB.initialize()
  .then(async () => {
    if (config.app.env !== 'test') {
      app.listen(port, function () {
        console.log(`App is listening on port ${port} !`);
      });
    }
  })
  .catch((error) => console.log(error));

export { app };
