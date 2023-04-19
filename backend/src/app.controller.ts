import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('answer')
  async getRespnose(@Body() params: any): Promise<string> {
    return this.appService.getAIText(params.qus);
  }
}
