import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class ApiService {
  getHello(): string{
    return 'Hello World!'
  }

}