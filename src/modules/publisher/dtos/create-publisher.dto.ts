import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreatePublisherDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(14)
  siret: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  phone: string;
}
