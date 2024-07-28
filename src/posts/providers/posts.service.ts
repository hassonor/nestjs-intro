import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UserService } from '../../users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersServer: UserService) {}
  public createPost(createPostDto: CreatePostDto) {
    return 'You sent a post request to posts endpoint';
  }

  public findAll(userId: string) {
    const user = this.usersServer.findOneById(userId);
    return [
      { user, title: 'Test Title', content: 'Test Content' },
      { user, title: 'Test Title 2', content: 'Test Content 2' },
    ];
  }
}
