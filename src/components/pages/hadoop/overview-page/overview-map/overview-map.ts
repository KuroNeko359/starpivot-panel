export enum MapDataTypes {
    STRING,
    NUMBER,
    BYTES,
    KB,
    MB,
    GB,
    TB,
    PERCENT,
    TIMESTAMP,
    MODE_BOOLEAN,
    OBJECT,
}

export interface ValueAndType {
    value: any,
    type: MapDataTypes
}

export function getValueFormatByType(valueAndType: ValueAndType) {
    switch (valueAndType.type) {
        case MapDataTypes.BYTES:
            return valueAndType.value + "bytes";
        case MapDataTypes.KB:
            return (valueAndType.value / 1024).toFixed(2) + "KB";
        case MapDataTypes.MB:
            return (valueAndType.value / 1024 / 1024).toFixed(2) + "MB";
        case MapDataTypes.GB:
            return (valueAndType.value / 1024 / 1024 / 1024).toFixed(2) + "GB";
        case MapDataTypes.MODE_BOOLEAN:
            if (valueAndType.value) {
                return "on";
            } else return "off";
        default:
            return valueAndType.value;
    }
}
