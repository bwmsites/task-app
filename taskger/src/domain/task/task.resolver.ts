import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from '@domain/task/dto/create-task.dto';
import { Task } from '@domain/task/model/task.model';
import { TaskService } from '@domain/task/task.service';
import { UpdateTaskInput } from '@domain/task/dto/update-task.dto';
import { TaskStatusEnum } from '@common/enums/TaskStatus.enum';
import { SetTaskStatusInput } from '@domain/task/dto/set-task-status.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => Task)
  async task(@Args('id') id: string): Promise<Task> {
    const task = await this.taskService.getTaskById(id);

    if (!task) {
      throw new NotFoundException(id);
    }

    return task;
  }

  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  async createTask(
    @Args('newTaskData') newTaskData: CreateTaskInput,
  ): Promise<Task> {
    const task = await this.taskService.createTask(newTaskData);
    return task;
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('updateTaskData') updateTaskData: UpdateTaskInput,
  ): Promise<Task> {
    return this.taskService.updateTask(updateTaskData);
  }

  @Mutation(() => Task)
  async setTaskStatus(
    @Args('setTaskStatusData') setTaskStatusData: SetTaskStatusInput,
  ): Promise<Task> {
    return this.taskService.updateTask(setTaskStatusData);
  }

  @Mutation(() => Task)
  async archiveTask(@Args('id') id: string): Promise<Task> {
    return this.taskService.updateTask({
      id,
      status: TaskStatusEnum.ARCHIVED,
    });
  }
}