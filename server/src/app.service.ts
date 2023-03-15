import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  shorten(url: string): string {
    const hash = Math.random().toString(36).slice(7); //temp
    return hash;
  }

  retrieve(hash: string): string {
    return undefined;
  }
}
