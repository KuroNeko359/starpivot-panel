const hostname = "hadoop102";
const port = 8080;
export const config = {
    starpivot: {
        hostname: hostname,
        port: port,
        baseURL: `http://${hostname}:${port}/`,
    }
}
