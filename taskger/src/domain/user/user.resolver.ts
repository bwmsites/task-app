import {
  Resolver,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { User } from '@domain/user/model/user.model';
import { UserService } from '@domain/user/user.service';
import { Task } from '@domain/task/model/task.model';
import { TaskService } from '@domain/task/task.service';
import { CreateUserInput } from '@domain/user/dto/create-user.dto';
import { LoginInput } from '@domain/user/dto/login-user.dto';
import { LoggedUser } from '@domain/user/model/login.model';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  @ResolveField(() => [Task])
  async tasks(@Parent() user: User): Promise<Task[]> {
    return this.taskService.getTasksByUser(user.id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('newUserData') newUserData: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(newUserData);
  }

  @Mutation(() => LoggedUser)
  async login(@Args('loginData') loginData: LoginInput): Promise<LoggedUser> {
    const user = await this.userService.findUserByEmailAndPassword(loginData);

    const token = this.userService.generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    } as LoggedUser;
  }
}
