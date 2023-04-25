import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ContactRepository } from '../../repositories';
import { IsUnique } from '../../rules/IsUnique';

export class UpdateContactRequest {
  id: number;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsUnique(ContactRepository, {
    message: 'Contact mobile already exists.',
  })
  @IsPhoneNumber()
  mobile: string;

  @IsEmail()
  email: string;
}
