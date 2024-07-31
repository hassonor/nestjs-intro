import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from '../../auth/providers/auth.service';

/**
 * Service to handle business logic related to users.
 */
@Injectable()
export class UserService {
  /**
   * Constructs the UserService and injects the AuthService.
   * @param {AuthService} authService - The authentication service.
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Retrieves all users based on the provided parameters.
   * @param {GetUsersParamDto} getUserParamDto - The parameters for getting users.
   * @param {number} limit - The number of users to retrieve.
   * @param {number} page - The page number for pagination.
   * @returns {Array<{firstName: string, email: string}>} - A list of users.
   */
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

  /**
   * Finds a single user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {{id: number, firstName: string, email: string}} - The user details.
   */
  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Or',
      email: 'hassonor@gmail.com',
    };
  }
}
