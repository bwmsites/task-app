import { Module } from '@nestjs/common';
import { TaskResolver } from '@domain/task/task.resolver';
import { TaskService } from '@domain/task/task.service';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [TaskResolver, TaskService, DatabaseService],
})
export class TaskModule {}
