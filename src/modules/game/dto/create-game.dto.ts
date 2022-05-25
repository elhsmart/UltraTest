import {
  IsNumberString,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { PublisherExists } from './../../../modules/publisher/decorators';

export class CreateGameDto {
  @IsNotEmpty({ message: 'title cannot be empty.' })
  @IsString({ message: 'title must to be a string.' })
  title: string;

  @IsNotEmpty({ message: 'price cannot be empty.' })
  @IsNumberString(
    { allowNaN: false, maxDecimalPlaces: 2 },
    {
      message:
        'price must be a number and have a maximum fraction of 2 digits.',
    },
  )
  price: number;

  @IsOptional()
  @IsNumberString()
  @PublisherExists()
  publisherId: number;

  @IsNotEmpty({ message: 'releaseDate cannot be empty.' })
  @IsDateString({}, { message: 'releaseDate type is not valid.' })
  releaseDate: Date;

  @IsOptional()
  @IsString({ message: 'tag list must be string.' })
  tag: string;
}
