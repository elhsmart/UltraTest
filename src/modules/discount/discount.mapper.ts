import { Mapper } from "../mapper";
import { PublicDiscountDto } from "./dto/public-discount.dto";
import { Discount } from "./entities/discount.entity";

export class DiscountMapper extends Mapper<PublicDiscountDto, Discount> {
    public mapFrom(data: Discount): PublicDiscountDto {
        const discount = new PublicDiscountDto();
        discount.id = data.id;
        discount.value = Number(data.value);
        discount.createdAt = data.createdAt;
        return discount;
    }

    public mapTo(data: PublicDiscountDto): Discount {
        const discount = new Discount();
        discount.id = data.id;
        discount.value = String(data.value);
        discount.createdAt = data.createdAt;
        return discount;
    }
}

