import { User } from './user.model';
import { ManyToOne, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('Post')
export class Post {
    @PrimaryGeneratedColumn({
        name: 'PostId',
    })
    postId: string;

    @Column({
        name: 'Title',
        nullable: false,
        length: 100,
    })
    title: string;

    @Column({
        name: 'Category',
        nullable: false,
        length: 255,
    })
    category: string;

    @Column({
        name: 'Content',
        nullable: false,
        length: 4000,
    })
    text: string;

    @Column({
        name: 'Attachment',
    })
    attachment: string;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    constructor(data: Post | {} = {}){
        Object.assign(this, data);
    }
}