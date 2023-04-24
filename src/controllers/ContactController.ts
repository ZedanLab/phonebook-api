import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';

@Controller()
export class ContactController {
  @Get('/contacts')
  getAll() {
    return 'This action returns all contacts';
  }

  @Get('/contacts/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns contact #' + id;
  }

  @Post('/contacts')
  post(@Body() contact: any) {
    return 'Saving contact...';
  }

  @Put('/contacts/:id')
  put(@Param('id') id: number, @Body() contact: any) {
    return 'Updating a contact...';
  }

  @Delete('/contacts/:id')
  remove(@Param('id') id: number) {
    return 'Removing contact...';
  }
}
