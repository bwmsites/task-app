import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '@database/database.service';
import { UserService } from '@domain/user/user.service';
import { User } from '@domain/user/model/user.model';

const databaseServiceMock = () => ({
  onModuleInit: jest.fn(),
  user: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
});

describe('User Service', () => {
  let userService: UserService;
  let databaseService: DatabaseService;
  let userMock: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useFactory: databaseServiceMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    databaseService = module.get<DatabaseService>(DatabaseService);

    userMock = {
      id: 'd08723e6-dc7c-47ec-9f21-dacc26092085',
      name: 'New User',
      email: 'user@mailinator.com',
      password: '12345678',
    };
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a new user', async () => {
    (databaseService.onModuleInit as jest.Mock).mockReturnValue(true);
    (databaseService.user.create as jest.Mock).mockReturnValue(userMock);

    const response = await userService.createUser({
      name: 'New User',
      email: 'user@mailinator.com',
      password: '12345678',
    });

    expect(response).toBe(userMock);
  });

  it('should find a user by their email and password', async () => {
    (databaseService.onModuleInit as jest.Mock).mockReturnValue(true);
    (databaseService.user.findFirst as jest.Mock).mockReturnValue(userMock);

    const response = await userService.findUserByEmailAndPassword({
      email: 'user@mailinator.com',
      password: '12345678',
    });

    expect(response).toBe(userMock);
  });
});
