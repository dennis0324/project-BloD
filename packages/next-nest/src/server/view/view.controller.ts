import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'

import { ViewService } from './view.service'
import { AuthGuard } from './view.interceptor'

@Controller('/')
@UseGuards(AuthGuard)
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler()
    handle(req, res)
  }
}