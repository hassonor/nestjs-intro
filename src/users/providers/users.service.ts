import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {GetUsersParamDto} from '../dtos/get-users-param.dto';
import {AuthService} from '../../auth/providers/auth.service';
import {Repository} from "typeorm";
import {User} from "../user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dtos/create-user.dto";

/**
 * Service to handle business logic related to users.
 */
@Injectable()
export class UserService {
    /**
     * Constructs the UserService and injects the AuthService.
     * @param userRepository
     * @param {AuthService} authService - The authentication service.
     */
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {
    }

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: {email: createUserDto.email}
        });
        let newUser = this.userRepository.create(createUserDto);
        newUser = await this.userRepository.save(newUser);
        newUser.password = undefined;
        return newUser;
    }

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
