import { PartialType } from '@nestjs/mapped-types';
import { CreatePublisherDto } from './create-publisher.dto';

export class EditPublisherDto extends PartialType(CreatePublisherDto) {}
