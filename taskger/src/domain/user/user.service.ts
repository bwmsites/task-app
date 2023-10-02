import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DatabaseService } from '@database/database.service';
import { CreateUserInput } from '@domain/user/dto/create-user.dto';
import { User } from '@domain/user/model/user.model';
import { LoginInput } from './dto/login-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly db: DatabaseService) {}

  generateToken({ id, email, password }: User): string {
    return jwt.sign({ id, email, password }, 'my_secret');
  }

  async createUser(data: CreateUserInput): Promise<User> {
    this.logger.log(`Creating user ${JSON.stringify({ data })}`);

    return await this.db.user.create({
      data,
    });
  }

  async findUserByEmailAndPassword({
    email,
    password,
  }: LoginInput): Promise<User> {
    return await this.db.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
  }
}
