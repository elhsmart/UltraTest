import { PublicDiscountDto } from 'src/modules/discount/dto/public-discount.dto';
import { PublicTagDto } from 'src/modules/tag/dto/public-tag.dto';

export class PublicGameDto {
  id: number;
  title: string;
  price: number;
  releaseDate: Date;
  publisher: number;
  createdAt: Date;
  updatedAt: Date;
  discount: PublicDiscountDto;
  tag: PublicTagDto[];
}
