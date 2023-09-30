import { Module } from '@nestjs/common';
import { TaskResolver } from '@domain/task/task.resolver';
import { TaskService } from '@domain/task/task.service';

@Module({
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
