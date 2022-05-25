import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsPublisherAlreadyExist } from '../validators';

export function PublisherExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'PublisherExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPublisherAlreadyExist,
    });
  };
}
