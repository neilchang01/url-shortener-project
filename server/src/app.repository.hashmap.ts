import { AppRepository } from './app.repository';

export class AppRepositoryHashmap implements AppRepository {
  private readonly hashMap: Map<string, string>;

  constructor() {
    this.hashMap = new Map<string, string>();
  }

  get(hash: string): string {
    return this.hashMap.get(hash);
  }

  put(hash: string, url: string): string {
    return this.hashMap.set(hash, url).get(hash);
  }
}