interface Path {
    root: boolean;
    uriPathAbsolute: boolean;
    absoluteAndSchemeAuthorityNull: boolean;
    name: string;
    parent: Path | null;
    absolute: boolean;
}

interface Permission {
    stickyBit: boolean;
    aclBit: boolean;
    encryptedBit: boolean;
    erasureCodedBit: boolean;
    userAction: string;
    groupAction: string;
    otherAction: string;
    masked: null;
    unmasked: null;
}

interface BlockLocation {
    hosts: string[];
    cachedHosts: string[];
    names: string[];
    topologyPaths: string[];
    storageIds: string[];
    storageTypes: string[];
    offset: number;
    length: number;
    corrupt: boolean;
}

export interface FileInfo {
    path: Path;
    permission: Permission;
    owner: string;
    group: string;
    symlink: Path;
    permissionString: string;
    name: string;
    pathInHdfs: string;
    blockLocations: BlockLocation[];
    len: number;
    replication: number;
    blockSize: number;
    encrypted: boolean;
    erasureCoded: boolean;
    dir: boolean;
    snapshotEnabled: boolean;
    modificationTime: number;
    accessTime: number;
    directory: boolean;
    file: boolean;
}

export interface IFileContent {
    path: string;
    content: string;
}