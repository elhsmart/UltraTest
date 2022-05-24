import {
    IsString,
    IsNotEmpty
} from 'class-validator';

export class CreateTagDto {
    @IsNotEmpty({ message: 'title cannot be empty.' })
	@IsString({ message: 'title must to be a string.' })
    title: string;
}