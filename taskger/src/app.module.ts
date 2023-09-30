import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/app-config.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TaskModule } from './domain/task/task.module';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/common/graphql/schema.gql'),
      sortSchema: true,
    }),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
