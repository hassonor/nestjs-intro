import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from '../../auth/providers/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        firstName: 'Or',
        email: 'hassonor@gmail.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@gmail.com',
      },
    ];
  }

  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Or',
      email: 'hassonor@gmail.com',
    };
  }
}
