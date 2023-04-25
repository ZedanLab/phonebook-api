import { QueryBuilder } from '../helpers/QueryBuilder';
import { DB } from '../database';
import { Contact } from '../models';
import { IncomingMessage } from 'http';

export const ContactRepository = DB.getRepository(Contact).extend({
  async getList({
    req,
    sort,
    filters,
    paginate,
    page,
  }: {
    req: IncomingMessage;
    sort?: string;
    filters?: any;
    paginate?: number;
    page?: number;
  }) {
    const eachPage: number = paginate ?? 10;
    const currentPage: number = page ?? 1;

    const queryBuilder = new QueryBuilder(req, sort, filters);
    const where = queryBuilder.filters();
    const order = queryBuilder.order();
    const link = queryBuilder.requestLink();

    const data: Contact[] = await this.find({
      skip: (currentPage - 1) * eachPage,
      take: eachPage,
      order,
      where,
    });

    const total: number = await this.count({
      where,
    });

    return { data, total, link, eachPage, currentPage };
  },
});
