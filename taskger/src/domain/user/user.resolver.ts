import { Resolver, Query, ResolveField, Parent, Mutation, Args } from '@nestjs/graphql';
import { User } from '@domain/user/model/user.model';
import { UserService } from '@domain/user/user.service';
import { Task } from '@domain/task/model/task.model';
import { TaskService } from '@domain/task/task.service';
import { CreateUserInput } from './dto/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
  ) {}

    //   @Query(() => [User])
    //   async users(): Promise<User[]> {
    //     return this.userService.findAll();
    //   }

    //   @ResolveField(() => [Task])
    //   async tasks(@Parent() user: User): Promise<Task[]> {
    //     return this.taskService.findByUserId(user.id);
    //   }

  @Mutation(() => User)
  async createUser(
    @Args('newUserData') newUserData: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(newUserData);
  }
}
