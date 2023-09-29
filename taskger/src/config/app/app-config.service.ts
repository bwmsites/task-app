import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private _configService: ConfigService) {}

  get name(): string {
    return this._configService.get<string>('app.name');
  }

  get env(): string {
    return this._configService.get<string>('app.env');
  }

  get url(): string {
    return this._configService.get<string>('app.url');
  }

  get port(): number {
    return this._configService.get<number>('app.port');
  }
}
