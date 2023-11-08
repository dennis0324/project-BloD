import { ApiService } from './api.service';
export declare class ApiController {
    private readonly viewService;
    private logger;
    constructor(viewService: ApiService);
    blogPost(query: any): Promise<unknown>;
    thumbnail(query: any): Promise<unknown>;
}
