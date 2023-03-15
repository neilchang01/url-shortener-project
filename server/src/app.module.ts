import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppRepositoryTag } from './app.repository';
import { AppRepositoryHashmap } from './app.repository.hashmap';
import { AppRepositoryRedis } from './app.repository.redis';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: AppRepositoryTag, useClass: AppRepositoryRedis },
  ],
})
export class AppModule {}
