import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { AppEnvEnum } from '@common/enums/AppEnvEnums';
import { AppConfigService } from '@config/app/app-config.service';
import configuration from '@config/app/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('taskger-api'),
        APP_ENV: Joi.string()
          .valid(AppEnvEnum.DEVELOPMENT, AppEnvEnum.TEST)
          .default(AppEnvEnum.DEVELOPMENT),
        APP_URL: Joi.string().default('http://localhost'),
        APP_PORT: Joi.number().integer().default(3001),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
