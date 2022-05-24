import { In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>;

    async findOrCreate(tags: string[]) {
        let searchTags = await this.repository.find({
            where: { title: In(tags) }
        });

        // need to create anything
        if(searchTags.length === 0) {
            for(let x = 0; x < tags.length; x++) {
                let newTag = new Tag();
                newTag.title = tags[x];
                searchTags.push(await this.repository.save(newTag));
            }

            return searchTags;
        }

        let unknownTags = tags.filter(x => !searchTags.map(tag => tag.title).includes(x));
        if(unknownTags.length === 0) {
            console.log(searchTags);
            return searchTags;            
        }

        console.log(unknownTags);
        for(let x = 0; x < unknownTags.length; x++) {
            let newTag = new Tag();
            newTag.title = unknownTags[x];
            searchTags.push(await this.repository.save(newTag));
        }        

        return searchTags;
    }
}
