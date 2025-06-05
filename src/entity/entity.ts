export interface Component {
    name: string;
    version: string;
    isInstalled: boolean;
}

export interface Property {
    name: string;
    value: string;
    description?: string;
}