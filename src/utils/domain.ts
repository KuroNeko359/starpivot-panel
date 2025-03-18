// function getFileSystemPath(currentUrl: string | URL) {
//     let url = new URL(currentUrl);
//     let pathSplitList: string[] = []
//     url.pathname.split("/").map(pathSplit => {
//         if (pathSplit.length > 1) {
//             pathSplitList.push(pathSplit);
//         }
//     })
//     pathSplitList[0] = "/";
//     return pathSplitList;
// }

/**
 * 解析URL并提取fs后的目录
 * @param {string} url - 要解析的URL
 * @returns {string} - fs后的目录
 */
export function getFileSystemPath(url: String):string[] {
    // 使用正则表达式解析URL中的路径部分
    const pathMatch = url.match(/^https?:\/\/[^\/]+\/(.*)$/);

    if (!pathMatch) {
        throw new Error('Invalid URL format.');
    }

    const path = pathMatch[1];

    // 查找fs后的部分
    const fsIndex = path.indexOf('fs');
    if (fsIndex === -1) {
        throw new Error('fs not found in the URL.');
    }

    // 提取fs后的目录
    return path.substring(fsIndex + 2).replace(/^\/+/, '').split("/");
}

/**
 * 解析URL并提取fs之前的路径（包括fs）
 * @param {string} url - 要解析的URL
 * @returns {string} - fs之前的路径（包括fs）
 */
export function getPathBeforeFS(url: string): string {
    // 使用正则表达式解析URL中的路径部分
    const pathMatch = url.match(/^https?:\/\/[^\/]+\/(.*)$/);

    if (!pathMatch) {
        throw new Error('Invalid URL format.');
    }

    const path = pathMatch[1];

    // 查找fs之前的部分
    const fsIndex = path.indexOf('fs');
    if (fsIndex === -1) {
        throw new Error('fs not found in the URL.');
    }

    // 提取fs之前的路径部分
    return path.substring(0, fsIndex + 2);  // 包括'fs'
}


/**
 * 获取当前域名
 * @returns {string} - 当前域名
 */
export function getCurrentDomain() {
    return window.location.href.toString();
}



export function pathListToString(pathList: string[]) {
    let path = "";
    pathList.forEach(pathSlice => {
        path += "/" + pathSlice
    })
    return path
}


export function pathStringToList(pathString: string) {
    let pathSlice = pathString.split("/").filter( item => item !== '');
    return pathSlice;
}

