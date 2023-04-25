import { FindOptionsOrder, FindOptionsWhere, Like, Entity } from 'typeorm';
import { config } from '../config';
import { IncomingMessage } from 'http';

export class QueryBuilder {
  private _req: IncomingMessage;
  private _sort: string;
  private _filters?: any;

  constructor(req: IncomingMessage, sort?: string, filters?: any) {
    this._req = req;
    this._sort = sort ?? 'id';
    this._filters = filters;
  }

  filters(): undefined | FindOptionsWhere<typeof Entity> {
    if (this._filters === undefined) return;

    return Object.fromEntries(
      Object.entries(this._filters).map(([key, value]) => [
        key,
        Like(`${value}%`),
      ]),
    ) as FindOptionsWhere<typeof Entity>;
  }

  order(): undefined | FindOptionsOrder<typeof Entity> {
    const sortBy: string = this._sort?.replace('-', '');
    const sortDir: string = this._sort?.startsWith('-') ? 'DESC' : 'ASC';

    return { [sortBy]: { direction: sortDir } };
  }

  requestLink(): string {
    return new URL(
      this._req.url!,
      `${config.app.schema}://${this._req.headers.host}`,
    ).href;
  }
}
