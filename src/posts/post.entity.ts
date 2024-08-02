import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

import {CreatePostMetaOptionsDto} from "./dtos/create-meta-options.dto";
import {PostType} from "./enums/postType.enum";
import {PostStatus} from "./enums/postStatus.enum";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 1024, nullable: false})
    title: string;

    @Column({type: 'enum', enum: PostType, nullable: false, default: PostType.POST})
    postType: PostType;

    @Column({type: 'varchar', length: 512, nullable: false, unique: true})
    slug: string;

    @Column({type: 'enum', enum: PostStatus, nullable: false, default: PostStatus.DRAFT})
    status: PostStatus;

    @Column({type: 'text', nullable: true})
    content?: string;

    @Column({type: 'text', nullable: true})
    schema?: string;

    @Column({type: 'varchar', length: 1024, nullable: true})
    featuredImageUrl?: string;

    @Column({type: 'timestamp', nullable: true})
    publishOn?: Date;


    //TODO: Complete with relationship
    tags: string[];
    metaOptions: CreatePostMetaOptionsDto[];
}