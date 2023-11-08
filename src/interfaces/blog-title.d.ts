export interface ApiBlogPost {
    err: 0 | 1;
    data: PostInfo;
    length: number;
}
export interface PostInfo {
    name: string;
    id: string;
    tags: string[];
    createAt: string;
    updateAt: string;
    archived: boolean;
    preface: string;
}
