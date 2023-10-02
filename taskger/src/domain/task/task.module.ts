import { Module } from '@nestjs/common';
import { TaskResolver } from '@domain/task/task.resolver';
import { TaskService } from '@domain/task/task.service';
import { DatabaseService } from '@database/database.service';
import { UserModule } from '@domain/user/user.module';

@Module({
  imports: [UserModule],
  providers: [TaskResolver, TaskService, DatabaseService],
  exports: [TaskService],
})
export class TaskModule {}
