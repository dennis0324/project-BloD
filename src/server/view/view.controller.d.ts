import { Request, Response } from 'express';
import { ViewService } from './view.service';
export declare class ViewController {
    private viewService;
    constructor(viewService: ViewService);
    static(req: Request, res: Response): void;
}
