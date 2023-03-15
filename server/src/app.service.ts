import { Inject, Injectable } from '@nestjs/common';
import { AppRepository, AppRepositoryTag } from './app.repository';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppRepositoryTag) private readonly appRepository: AppRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  retrieve(hash: string): string {
    return this.appRepository.get(hash);
  }

  shorten(url: string): string {
    const hash = Math.random().toString(36).slice(7);
    this.appRepository.put(hash, url);
    return hash;
  }
}
