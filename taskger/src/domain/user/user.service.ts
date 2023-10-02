import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DatabaseService } from '@database/database.service';
import { CreateUserInput } from '@domain/user/dto/create-user.dto';
import { User } from '@domain/user/model/user.model';
import { LoginInput } from '@domain/user/dto/login-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly db: DatabaseService) {}

  generateToken({ id, email, password }: User): string {
    try {
      return jwt.sign({ id, email, password }, 'my_secret');
    } catch (error) {
      this.logger.error(
        `Could not generate token due to ERROR: ${
          error.message | error.stack | error
        }`,
      );

      throw new InternalServerErrorException(error);
    }
  }

  async createUser(data: CreateUserInput): Promise<User> {
    this.logger.log(`Creating user ${JSON.stringify({ data })}`);

    try {
      return await this.db.user.create({
        data,
      });
    } catch (error) {
      this.logger.error(
        `Could not create user due to ERROR: ${
          error.message | error.stack | error
        }`,
      );

      throw new InternalServerErrorException(error);
    }
  }

  async findUserByEmailAndPassword({
    email,
    password,
  }: LoginInput): Promise<User> {
    this.logger.log(`Searching for user with ${{ email, password }}`);

    return await this.db.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async findUserById(id: string): Promise<User> {
    this.logger.log(`Searching for user with ID ${id}`);

    return await this.db.user.findUnique({
      where: {
        id,
      },
    });
  }
}
