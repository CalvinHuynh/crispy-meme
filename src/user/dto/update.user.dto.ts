import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    username: string;

    @ApiModelProperty({
        description: 'Email in order to receive our awesome newsletter',
        example: 'IkSnapErNiks@van.nl',
    })
    email: string;

    @ApiModelProperty({
        description: 'Date of Birth in the following format yyyy-mm-dd.',
        example: '2000-02-20',
    })
    birthDate: Date;

    posts: any;
}