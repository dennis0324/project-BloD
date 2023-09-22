import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class PollsService {
  private readonly logger = new Logger(PollsService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(){
    const payload = {
      sercet:this.configService.get<string>('BLOD_MESSAGE_SECRET')
    }
    const token = this.jwtService.sign(payload)
    return token
  }

}