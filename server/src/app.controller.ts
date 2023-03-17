import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

interface ShortenResponse {
  hash: string;
}

interface ErrorResponse {
  error: string;
  code: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shorten')
  shorten(@Body('url') url: string): ShortenResponse | ErrorResponse {
    if (!url) {
      return { error: `Invalid request. Please provide a valid URL. Example: 'https://example.com'.`, code: 400 };
    };

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return { error: `Invalid request. Please provide a valid URL. Example: 'https://example.com'.`, code: 400 };

    }
    return { hash: this.appService.shorten(url) };
  }

  // Redirect shortened link
  @Get(':hash')
  @Redirect()
  async retrieveAndRedirect(@Param('hash') hash): Promise<{ url: string } | ErrorResponse> {
    const url = await this.appService.retrieve(hash);
    if (!url) {
      return { error: `Invalid request. Please provide a valid URL.`, code: 400 };
    }
    return { url };
  }
}
