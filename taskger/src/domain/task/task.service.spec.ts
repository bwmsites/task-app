import { Test, TestingModule } from '@nestjs/testing';
import { Task as TASK_DB, TaskStatusType } from '@prisma/client';
import { DatabaseService } from '@database/database.service';
import { Task } from '@domain/task/model/task.model';
import { TaskService } from '@domain/task/task.service';
import { TaskStatusEnum } from '@common/enums/TaskStatus.enum';

const databaseServiceMock = () => ({
  onModuleInit: jest.fn(),
  task: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
});

describe('Task Service', () => {
  let taskService: TaskService;
  let databaseService: DatabaseService;
  let taskMock: Task;
  let taskDBMock: TASK_DB;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DatabaseService,
          useFactory: databaseServiceMock,
        },
        TaskService,
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    databaseService = module.get<DatabaseService>(DatabaseService);

    taskMock = {
      id: 'a9e0ab56-c8b2-4fd6-8043-a378d04ed720',
      title: 'My Task',
      description: 'This is my brand new task',
      createdAt: new Date(),
      updatedAt: null,
      status: TaskStatusEnum.TO_DO,
      userId: 'd08723e6-dc7c-47ec-9f21-dacc26092085',
    };

    taskDBMock = {
      id: 'a9e0ab56-c8b2-4fd6-8043-a378d04ed720',
      title: 'My Task',
      description: 'This is my brand new task',
      createdAt: new Date(),
      updatedAt: null,
      status: TaskStatusType.TO_DO,
      userId: 'd08723e6-dc7c-47ec-9f21-dacc26092085',
    };
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  it('should create a new task', async () => {
    (databaseService.onModuleInit as jest.Mock).mockReturnValue(true);
    (databaseService.task.create as jest.Mock).mockReturnValue(taskDBMock);

    const response = await taskService.createTask({
      title: 'My Task',
      description: 'This is my brand new task',
      status: TaskStatusEnum.TO_DO,
      userId: 'd08723e6-dc7c-47ec-9f21-dacc26092085',
    });

    expect(response).toStrictEqual(taskMock);
  });
});
