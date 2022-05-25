import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper";
import { PublicTagDto } from "./dto/public-tag.dto";
import { Tag } from "./entities/tag.entity";

export class TagMapper extends Mapper<PublicTagDto, Tag> {
    public mapFrom(data: Tag): PublicTagDto {
        const tag = new PublicTagDto();
        tag.id = data.id;
        tag.title = data.title;
        tag.createdAt = data.createdAt;
        return tag;
    }

    public mapTo(data: PublicTagDto): Tag {
        const tag = new Tag();
        tag.id = data.id;
        tag.title = data.title;
        tag.createdAt = data.createdAt;
        return tag;
    }
}

