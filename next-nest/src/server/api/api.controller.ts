import { Controller, Get, Res, Req, Logger, Post } from '@nestjs/common'

import { ApiService } from './api.service'

@Controller('/api')
export class ApiController {
  private logger = new Logger(ApiController.name)
  constructor(private readonly viewService: ApiService) {}

  @Get()
  async get() {
    return this.viewService.getHello()
  }

}