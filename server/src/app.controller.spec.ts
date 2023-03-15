import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppRepositoryTag } from './app.repository';
import { AppRepositoryHashmap } from './app.repository.hashmap';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: AppRepositoryTag, useClass: AppRepositoryHashmap },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('shorten', () => {
    it('should return a valid string', () => {
      const url = 'test.com';
      const hash = appController.shorten(url);
      expect(hash).toBeTruthy();
    })
  });
});
