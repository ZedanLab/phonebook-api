import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  OnUndefined,
  JsonController,
  QueryParam,
  Req,
} from 'routing-controllers';
import { ContactRepository } from '../repositories';
import { NotFoundError } from '../errors';
import { StoreContactRequest } from './requests/StoreContactRequest';
import { UpdateContactRequest } from './requests/UpdateContactRequest';
import { validate } from 'class-validator';
import { JsonResponse } from '../helpers/JsonResponse';
import { IncomingMessage } from 'http';

@JsonController('/contacts')
export class ContactController {
  @Get()
  async index(
    @Req() req: IncomingMessage,
    @QueryParam('paginate') paginate?: number,
    @QueryParam('page') page?: number,
    @QueryParam('sort') sort?: string,
    @QueryParam('filter', { isArray: true }) filters?: any,
  ) {
    const { data, total, currentPage, eachPage, link } =
      await ContactRepository.getList({ req, filters, page, paginate, sort });

    return new JsonResponse(
      'Contacts List',
      data,
      total,
      currentPage,
      eachPage,
      link,
    ).json({ meta: true, links: true });
  }

  @Get('/:id')
  @OnUndefined(NotFoundError)
  async show(@Param('id') id: number) {
    return new JsonResponse(
      'Contact Details',
      await ContactRepository.findOneBy({ id }),
    ).json({});
  }

  @Post()
  async store(
    @Body({ required: true, validate: true }) contact: StoreContactRequest,
  ) {
    return new JsonResponse(
      'Contact Created',
      await ContactRepository.save(contact),
    ).json({});
  }

  @Put('/:id')
  @OnUndefined(NotFoundError)
  async update(
    @Param('id') id: number,
    @Body({ required: true, validate: false }) contact: UpdateContactRequest,
  ) {
    contact.id = id;

    await validate(contact);

    await ContactRepository.update(id, contact);

    return new JsonResponse('Contact Updated', contact).json({});
  }

  @Delete('/:id')
  @OnUndefined(NotFoundError)
  async destroy(@Param('id') id: number) {
    await ContactRepository.delete(id);

    return new JsonResponse('Contact Deleted', null).json({});
  }
}
