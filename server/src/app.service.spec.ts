import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import { AppRepositoryTag } from "./app.repository";
import { AppRepositoryHashmap } from "./app.repository.hashmap";
import { AppRepositoryRedis } from "./app.repository.redis";

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppRepositoryTag, useClass: AppRepositoryRedis },
        AppService,
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('retrieve', () => {
    it('should retrieve saved URL', async () => {
      const url = 'test.com';
      const hash = await appService.shorten(url);
      const retrieved = await appService.retrieve(hash);
      expect(retrieved).toEqual(url);
    });
  });
});