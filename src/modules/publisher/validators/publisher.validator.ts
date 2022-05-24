import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PublisherService } from '../publisher.service';
import { Injectable } from '@nestjs/common';
import { ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isPublisherAlreadyExist', async: true })
@Injectable()
export class IsPublisherAlreadyExist implements ValidatorConstraintInterface {
    constructor(protected readonly publisherService: PublisherService) {}

    async validate(text: string, args: ValidationArguments): Promise<boolean> {
        const publisher = await this.publisherService.findOneById(Number(text));
        if(!publisher) {
            return false;
        }
        
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return `Publisher with id ${args.value} not found`;
    }    
}