import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: any) {
    const url = context.switchToHttp().getRequest().url
    // this is for api route
    if(url === '/api')
      return false
    return true;
  }
}