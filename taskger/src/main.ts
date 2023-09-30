import './util/setup/aliases';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get app configs
  const appConfig: AppConfigService = app.get(AppConfigService);
  await app.listen(appConfig.port);
  console.log(`Server listening on ${await app.getUrl()}`);
}
bootstrap();
