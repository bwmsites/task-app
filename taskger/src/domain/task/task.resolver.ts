import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateTaskInput } from '@domain/task/dto/create-task.dto';
import { Task } from '@domain/task/model/task.model';
import { TaskService } from '@domain/task/task.service';
import { UpdateTaskInput } from '@domain/task/dto/update-task.dto';
import { TaskStatusEnum } from '@common/enums/TaskStatus.enum';
import { SetTaskStatusInput } from '@domain/task/dto/set-task-status.dto';
import { User } from '@domain/user/model/user.model';
import { AuthGuard } from '@common/auth/auth.guard';
import { UserService } from '@domain/user/user.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Query(() => Task)
  @UseGuards(new AuthGuard())
  async task(
    @Context('user') { id: userId }: User,
    @Args('id') id: string,
  ): Promise<Task> {
    const task = await this.taskService.getTaskById(id, userId);

    if (!task) {
      throw new NotFoundException(id);
    }

    return task;
  }

  @Query(() => [Task])
  @UseGuards(new AuthGuard())
  tasks(@Context('user') { id: userId }: User): Promise<Task[]> {
    return this.taskService.getTasksByUser(userId);
  }

  @ResolveField(() => User)
  async user(@Parent() task: Task): Promise<User> {
    return this.userService.findUserById(task.userId);
  }

  @Mutation(() => Task)
  @UseGuards(new AuthGuard())
  async createTask(
    @Context('user') { id: userId }: User,
    @Args('newTaskData') newTaskData: CreateTaskInput,
  ): Promise<Task> {
    const task = await this.taskService.createTask({ userId, ...newTaskData });
    return task;
  }

  @Mutation(() => String)
  @UseGuards(new AuthGuard())
  async deleteTask(
    @Context('user') { id: userId }: User,
    @Args('id') id: string,
  ): Promise<string> {
    return this.taskService.deleteTask(id, userId);
  }

  @Mutation(() => Task)
  @UseGuards(new AuthGuard())
  async updateTask(
    @Context('user') { id: userId }: User,
    @Args('updateTaskData') updateTaskData: UpdateTaskInput,
  ): Promise<Task> {
    return this.taskService.updateTask(updateTaskData, userId);
  }

  @Mutation(() => Task)
  @UseGuards(new AuthGuard())
  async setTaskStatus(
    @Context('user') { id: userId }: User,
    @Args('setTaskStatusData') setTaskStatusData: SetTaskStatusInput,
  ): Promise<Task> {
    return this.taskService.updateTask(setTaskStatusData, userId);
  }

  @Mutation(() => Task)
  @UseGuards(new AuthGuard())
  async archiveTask(
    @Context('user') { id: userId }: User,
    @Args('id') id: string,
  ): Promise<Task> {
    return this.taskService.updateTask(
      { id, status: TaskStatusEnum.ARCHIVED },
      userId,
    );
  }
}
