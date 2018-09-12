import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostModel } from './post.model';
import { TopicModel } from './topic.model';

@Entity('User')
export class UserModel {
    // Possible to use a GUID instead or another unique identifier other than id increments?
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

    @Column({
        name: 'CreatedDate',
        nullable: false,
    })
    createdDate: Date;

    // One user has many posts
    @OneToMany(type => PostModel, post => post.user)
    posts: PostModel[];

    // One user has many topics
    @OneToMany(type => TopicModel, topic => topic.topicStarter)
    topics: TopicModel[];

    constructor(data: UserModel | {} = {}){
        Object.assign(this, data);
        if (!this.createdDate) {
            this.createdDate = new Date();
        }
    }
}