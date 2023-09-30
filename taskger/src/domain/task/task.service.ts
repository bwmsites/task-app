import { Injectable } from '@nestjs/common';
import { TaskStatusEnum } from '@common/enums/TaskStatus.enum';
import { CreateTaskInput } from '@domain/task/dto/create-task.dto';
import { Task } from '@domain/task/model/task.model';
import { UpdateTaskInput } from '@domain/task/dto/update-task.dto';
import { SetTaskStatusInput } from '@domain/task/dto/set-task-status.dto';

export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
}

@Injectable()
export class TaskService {
  private readonly tasks: Task[] = [];

  async createTask(task: CreateTaskInput): Promise<Task> {
    const newTask: Task = {
      id: `tsk${this.tasks.length + 1}`,
      createdAt: new Date(),
      title: task.title,
      description: task.description,
      status: task.status,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  async getTasks(): Promise<Task[]> {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(this.tasks as Task[]), 10),
    );
  }

  async getTaskById(id: string): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);
    return await new Promise((resolve) => setTimeout(() => resolve(task), 10));
  }

  async deleteTask(id: string): Promise<boolean> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) return false;

    this.tasks.splice(this.tasks.indexOf(task), 1);
    return true;
  }

  async updateTask(
    updateData: UpdateTaskInput | SetTaskStatusInput,
  ): Promise<Task> {
    const task = this.tasks.find((task) => task.id === updateData.id);
    const index = this.tasks.indexOf(task);

    const updatedTask: Task = {
      ...(updateData as Task),
      createdAt: task.createdAt,
      updatedAt: new Date(),
    };

    this.tasks.splice(index, 1);
    this.tasks.push(updatedTask);

    return updatedTask;
  }
}
