import { HttpError } from 'routing-controllers';

export class NotFoundError extends HttpError {
  constructor() {
    super(404, 'Model not found!');
  }
}
