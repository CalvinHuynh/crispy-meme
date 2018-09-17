import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty({
        description: 'Email in order to receive our awesome newsletter',
        example: 'IkSnapErNiks@van.nl',
    })
    email: string;

    @ApiModelProperty({
        description: 'Username for features in the near future',
        example: 'Admin1234',
    })
    username: string;

    @ApiModelProperty({
        description: 'Date of Birth in the following format yyyy-mm-dd.',
        example: '2000-02-20',
    })
    birthDate: Date;

}