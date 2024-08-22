// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import envConfig from './env.config';
import localEnvConfig from './env.local.config';
import prodEnvConfig from './env.production.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [envConfig, localEnvConfig, prodEnvConfig],
      isGlobal: true, 
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
