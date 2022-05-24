import { 
    ValidateNested, 
    IsNumberString, 
    IsString,
    IsNotEmpty,
    IsOptional,
    IsArray,
    IsInt,
    IsDateString
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTagDto } from 'src/modules/tag/dto/create-tag.dto';
import { PublisherExists } from 'src/modules/publisher/decorators';

export class CreateGameDto {
	@IsNotEmpty({ message: 'title cannot be empty.' })
	@IsString({ message: 'title must to be a string.' })
    title: string;

	@IsNotEmpty({ message: 'price cannot be empty.' })
	@IsNumberString(
		{ allowNaN: false, maxDecimalPlaces: 2 },
		{ message: 'price must be a number and have a maximum fraction of 2 digits.' },
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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTagDto)
    tag: CreateTagDto[];
}
