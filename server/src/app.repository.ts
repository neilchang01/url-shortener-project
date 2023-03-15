export interface AppRepository {
    put(hash: string, url: string): Promise<string>;
    get(hash: string): Promise<string>;
  }
  
  export const AppRepositoryTag = 'AppRepository';