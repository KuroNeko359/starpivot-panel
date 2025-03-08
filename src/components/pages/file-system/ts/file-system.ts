export interface IFile {
    name: string;
    path: string;
    url: string;
    length: number;
    dir: boolean;
    blockReplication: number;
    blockSize: number;
    modificationTime: number;
    accessTime: number;
    permission: string;
    owner: string;
    group: string;
    symlink: string; // TODO 后端是Path类型 还未实现
    locations: any[];
}

export interface IFileContent {
    path: string;
    content: string;
}