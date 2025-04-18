import en from "@/i18n/locales/en/en.ts";

let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];


function sliceArray(array: Array<any>,partSize: number) {
    let start = 0;
    let end = partSize;
    let chunks: Array<Array<any>> = [];
    while (end < array.length) {
        let chunk = array.slice(start,end);
        chunks.push(chunk);
        start = end;
        end += partSize;
    }
    let lastChunk = array.slice(start,array.length);
    chunks.push(lastChunk);
    return chunks;
}

let arrays = sliceArray(a,3);
console.log(arrays);