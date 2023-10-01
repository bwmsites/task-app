import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { CreateUserInput } from '@domain/user/dto/create-user.dto';
import { User } from '@domain/user/model/user.model';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly db: DatabaseService) {}

  async createUser(data: CreateUserInput): Promise<User> {
    this.logger.log(`Creating user ${JSON.stringify({ data })}`);

    return await this.db.user.create({
      data,
    });
  }
}
