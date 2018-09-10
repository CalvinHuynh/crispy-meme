import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.model';

@Entity('User')
export class User {
    // See if there is a type which represents a GUID
    @PrimaryGeneratedColumn({
        name: 'UserId',
    })
    userId: string;

    @ApiModelProperty({
        description: 'Email in order to receive our awesome newsletter',
        example: 'IkSnapErNiks@van.nl',
    })
    @Column({
        name: 'Email',
        length: 100,
        unique: true,
        nullable: false,
    })
    email: string;

    @ApiModelProperty({
        description: 'Username for features in the near future',
        example: 'Admin1234',
    })
    @Column({
        name: 'Username',
        length: 100,
        unique: true,
        nullable: false,
    })
    username: string;

    @ApiModelProperty({
        description: 'Date of Birth in the following format yyyy-mm-dd.',
        example: '2000-02-20',
    })
    @Column({
        name: 'Date',
        nullable: true,
    })
    birthDate: Date;

    // One user has many posts
    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    constructor(data: User | {} = {}){
        Object.assign(this, data);
    }
}