import { OnModuleInit } from '@nestjs/common';
import next from 'next';
export declare class ViewService implements OnModuleInit {
    private server;
    onModuleInit(): Promise<void>;
    getNextServer(): ReturnType<typeof next>;
}
