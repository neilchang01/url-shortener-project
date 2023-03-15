export interface AppRepository {
    put(hash: string, url: string): string;
    get(hash: string): string;
  }
  
  export const AppRepositoryTag = 'AppRepository';