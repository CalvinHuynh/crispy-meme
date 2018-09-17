import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiModelProperty({
        description: 'Title of the post',
        example: 'Lorem ipsum',
    })
    title: string;

    @ApiModelProperty({
        description: 'Category description',
        example: 'worldnews',
    })
    category: string;

    @ApiModelProperty({
        description: 'Type your important message to the world here',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            ' Et egestas quis ipsum suspendisse ultrices gravida.',
    })
    text: string;

    @ApiModelPropertyOptional({
        description: 'Optional attachment',
    })
    attachment: string;

    user: any;
}