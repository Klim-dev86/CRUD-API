import http from 'http';
import { apiNotFound, getUser, postUser, deleteUser, putUser } from './controllers';
import 'dotenv/config'

export let server: http.Server;


export const initServer = () => {
    const hostname = '127.0.0.1';
    const port = Number(process.env.PORT);

    server = http.createServer((req, res) => {
        parseRequest(req, res);
    })

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    })

    server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request');
    })
}


export type RequestMethod = 'get' | 'post' | 'put' | 'delete';

const parseRequest = (req: http.IncomingMessage, res: http.ServerResponse): void => {
    const urlArr = req.url?.split('/').map(x => x.toLowerCase()) || [];
    const reqMethod = <RequestMethod>req.method?.toLowerCase() || '';

    urlArr.shift();
    if (urlArr[urlArr.length - 1] === '') {
        urlArr.pop();
    }

    if (urlArr[0] === 'api') {
        urlArr.shift();
        if ((urlArr[0] as any) === 'user') {
            urlArr.shift();

            if (reqMethod === 'get') {
                getUser(res, urlArr)
            }

            if (reqMethod === 'post') {
                postUser(req, res);
            }

            if (reqMethod === 'put') {
                putUser(req, res, urlArr)
            }

            if (reqMethod === 'delete') {
                deleteUser(res, urlArr);
            }

        } else {
            apiNotFound(res);
        }
    }
}