import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const repo: Repository<any> = args.constraints[0];
    const except: any = args.object;
    const { property } = args;

    return repo.findOneBy({ [property]: value }).then((model) => {
      return model && model.id != except.id ? false : true;
    });
  }
}

export function IsUnique(
  repository: Repository<any>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [repository],
      validator: IsUniqueConstraint,
    });
  };
}
