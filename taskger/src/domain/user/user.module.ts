import { Module } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { UserService } from '@domain/user/user.service';
import { UserResolver } from '@domain/user/user.resolver';
import { TaskModule } from '@domain/task/task.module';

@Module({
  imports: [TaskModule],
  providers: [UserResolver, UserService, DatabaseService],
})
export class UserModule {}
