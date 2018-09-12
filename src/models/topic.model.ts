import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { PostModel } from './post.model';
import { UserModel } from './user.model';

@Entity('Topic')
export class TopicModel {
    @PrimaryGeneratedColumn({
        name: 'TopicId',
    })
    topicId: string;

    @ApiModelProperty({
        description: 'Topic title',
        example: 'A meaningful topic title',
    })
    @Column({
        name: 'Title',
        nullable: false,
        length: 100,
    })
    title: string;

    @ApiModelProperty({
        description: 'Select the topic category',
        example: 'worldnews',
    })
    @Column({
        name: 'Category',
        nullable: false,
        length: 255,
    })
    category: string;

    @ApiModelProperty({
        description: 'A short summary and or goal of the topic',
        example: 'Discussing the latest Trump tweets while respecting the opinion of others',
    })
    @Column({
        name: 'Description',
        nullable: false,
        length: 250,
    })
    description: string;

    @Column({
        name: 'CreatedDate',
        type: Date,
        nullable: false,
    })
    createdDate: Date = null;

    @Column({
        name: 'UpdatedDate',
        type: Date,
        nullable: false,
    })
    updatedDate: Date = null;

    @OneToMany(type => PostModel, posts => posts.topic)
    posts: PostModel[];

    @ManyToOne(type => UserModel, users => users.topics)
    topicStarter: UserModel;

    // Add many to many for many topcis can have many users

    constructor(data: TopicModel | {} = {}) {
        Object.assign(this, data);
        if (!this.createdDate) {
            this.createdDate = new Date();
        }
        if (this.updatedDate !== new Date()) {
            this.updatedDate = new Date();
        }
    }
}