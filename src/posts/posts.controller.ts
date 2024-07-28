import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  public createUsers(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get('/:userId')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
