import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { TaskStatusType, Task as DB_TASK } from '@prisma/client';
import { TaskStatusEnum } from '@common/enums/TaskStatus.enum';
import { CreateTaskInput } from '@domain/task/dto/create-task.dto';
import { Task } from '@domain/task/model/task.model';
import { UpdateTaskInput } from '@domain/task/dto/update-task.dto';
import { SetTaskStatusInput } from '@domain/task/dto/set-task-status.dto';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  private readonly taskStatusMap = {
    [TaskStatusType.TO_DO]: 0,
    [TaskStatusType.IN_PROGRESS]: 1,
    [TaskStatusType.DONE]: 2,
    [TaskStatusType.ARCHIVED]: 3,
  };

  constructor(private readonly db: DatabaseService) {}

  private transformTaskResponse(task: DB_TASK): Task {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: this.taskStatusMap[task.status],
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async createTask(data: CreateTaskInput): Promise<Task> {
    try {
      const newTask = await this.db.task.create({
        data: {
          title: data.title,
          description: data.description,
          status: TaskStatusEnum[data.status] as TaskStatusType,
          User: {
            connect: {
              id: data.userId,
            },
          },
        },
      });

      return this.transformTaskResponse(newTask);
    } catch (error) {
      this.logger.error(
        `Could not create new task due to ERROR: ${
          error.message || error.stack
        }`,
      );

      throw new InternalServerErrorException(error);
    }
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.db.task.findMany();

    return tasks.map((task) => this.transformTaskResponse(task));
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.db.task.findUnique({
      where: {
        id,
      },
    });

    return this.transformTaskResponse(task);
  }

  async deleteTask(id: string): Promise<string> {
    try {
      const deleted = await this.db.task.delete({
        where: { id },
      });

      return deleted.id;
    } catch (error) {
      this.logger.error(
        `Could not delete task due to ERROR: ${error.message || error.stack}`,
      );

      throw new InternalServerErrorException(error);
    }
  }

  async updateTask<T extends UpdateTaskInput | SetTaskStatusInput>(
    updateData: T,
  ): Promise<Task> {
    try {
      const taskData = {
        ...(updateData as UpdateTaskInput),
        ...(updateData as SetTaskStatusInput),
      };

      const task = await this.db.task.update({
        where: { id: updateData.id },
        data: {
          title: taskData.title,
          description: taskData.description,
          status: TaskStatusEnum[taskData.status] as TaskStatusType,
          updatedAt: new Date(),
        },
      });

      return this.transformTaskResponse(task);
    } catch (error) {
      this.logger.error(
        `Could not update task due to ERROR: ${error.message || error.stack}`,
      );

      throw new InternalServerErrorException(error);
    }
  }
}
