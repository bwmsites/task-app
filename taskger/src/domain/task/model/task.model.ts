import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TaskStatusEnum } from '@common/enums/TaskStatus.enum';

registerEnumType(TaskStatusEnum, {
  name: 'TaskStatusEnum',
});

@ObjectType({ description: 'task' })
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => TaskStatusEnum)
  status: TaskStatusEnum;
}
