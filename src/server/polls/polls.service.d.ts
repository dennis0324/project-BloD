import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class PollsService {
    private readonly configService;
    private readonly jwtService;
    private readonly logger;
    constructor(configService: ConfigService, jwtService: JwtService);
    createToken(): string;
}
