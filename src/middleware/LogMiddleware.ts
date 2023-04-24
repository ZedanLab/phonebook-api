import * as express from 'express';
import morgan from 'morgan';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { config } from '../config';

@Middleware({ type: 'after' })
export class LogMiddleware implements ExpressMiddlewareInterface {
  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): any {
    return morgan(config.logging.output)(req, res, next);
  }
}
