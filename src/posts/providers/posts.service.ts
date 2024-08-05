import { Body, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UserService } from '../../users/providers/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersServer: UserService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}
  public async createPost(@Body() createPostDto: CreatePostDto) {
    // Create metaOptions
    const metaOption = createPostDto.metaOptions
      ? this.metaOptionsRepository.create(createPostDto.metaOptions)
      : null;
    if (metaOption) {
      await this.metaOptionsRepository.save(metaOption);
    }
    const post = this.postRepository.create(createPostDto);

    if (metaOption) {
      post.metaOptions = metaOption;
    }

    return await this.postRepository.save(post);
  }

  public findAll(userId: string) {
    const user = this.usersServer.findOneById(userId);
    return [
      { user, title: 'Test Title', content: 'Test Content' },
      { user, title: 'Test Title 2', content: 'Test Content 2' },
    ];
  }
}
