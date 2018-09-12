import { UserModel } from './user.model';
import { ManyToOne, PrimaryGeneratedColumn, Column, Entity, IsNull } from 'typeorm';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { TopicModel } from './topic.model';

@Entity('Post')
export class PostModel {
    @PrimaryGeneratedColumn({
        name: 'PostId',
    })
    postId: string;

    @ApiModelProperty({
        description: 'Title of the post',
        example: 'Lorem ipsum',
    })
    @Column({
        name: 'Title',
        nullable: true,
        length: 100,
    })
    title: string;

    @ApiModelProperty({
        description: 'Category description',
        example: 'worldnews',
    })
    @Column({
        name: 'Category',
        nullable: true,
        length: 255,
    })
    category: string;

    @ApiModelProperty({
        description: 'Type your important message to the world here',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            ' Et egestas quis ipsum suspendisse ultrices gravida.',
    })
    @Column({
        name: 'Content',
        nullable: false,
        length: 4000,
    })
    text: string;

    @ApiModelPropertyOptional({
        description: 'Optional attachment',
    })
    @Column({
        name: 'Attachment',
    })
    attachment: string;

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

    @ManyToOne(type => UserModel, user => user.posts)
    user: UserModel;

    @ManyToOne(type => TopicModel, topic => topic.posts)
    topic: TopicModel;

    constructor(data: PostModel | {} = {}) {
        Object.assign(this, data);
        if (!this.createdDate) {
            this.createdDate = new Date();
        }
        if (this.updatedDate !== new Date() || !this.updatedDate) {
            this.updatedDate = new Date();
        }
    }
}