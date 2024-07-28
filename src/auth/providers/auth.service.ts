import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from '../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public login(email: string, password: string, id: string) {
    const user = this.userService.findOneById(id);
    // login
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
