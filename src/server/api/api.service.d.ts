import { PollsService } from '../polls/polls.service';
export declare class ApiService {
    private readonly pollService;
    constructor(pollService: PollsService);
    private socket;
    getHello(): string;
    getTitle(query: {
        postCount: number;
        page: number;
    }): Promise<unknown>;
    getThumbnail(messageID: string): Promise<unknown>;
}
