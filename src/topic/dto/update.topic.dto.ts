import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateTopicDto {
    @ApiModelProperty({
        description: 'Topic title',
        example: 'A meaningful topic title',
    })
    title: string;

    @ApiModelProperty({
        description: 'Select the topic category',
        example: 'worldnews',
    })
    category: string;

    @ApiModelProperty({
        description: 'A short summary and or goal of the topic',
        example: 'Discussing the latest Trump tweets while respecting the opinion of others',
    })
    description: string;

    updatedDate: Date = null;

    posts: any[];
}