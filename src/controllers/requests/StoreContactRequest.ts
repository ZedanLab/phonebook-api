import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { IsUnique } from '../../rules/IsUnique';
import { ContactRepository } from '../../repositories';

export class StoreContactRequest {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsUnique(ContactRepository, {
    message: 'Contact mobile already exists.',
  })
  @IsPhoneNumber()
  mobile: string;

  @IsOptional()
  @IsUnique(ContactRepository, {
    message: 'Contact email already exists.',
  })
  @IsEmail()
  email: string;
}
