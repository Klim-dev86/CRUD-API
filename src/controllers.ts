import http from 'http';
import { users } from "./user-storage";
const crypto = require('crypto');

export const getUser = (res: http.ServerResponse, params: string[]): void => {
    if (params.length === 0) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(Array.from(users)))

    } else {
        const [userId] = params;

        if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
            res.writeHead(400);
            res.end('Invalid param')
            return
        }

        if (Array.from(users).filter(x => x['id'] === userId).length === 0) {
            res.writeHead(404);
            res.end('User does not exist')
            return
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(Array.from(users).filter(x => x['id'] === userId)))
    }
}

export const postUser = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {

    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }
    console.log(Buffer.concat(buffers).toString())

    try {
        const data = JSON.parse(Buffer.concat(buffers).toString());

        if ((data['username'] && typeof data['username'] === 'string')
            && (data['age'] && typeof data['age'] === 'number')
            && (data['hobbies'] && Array.isArray(data['hobbies']))) {
            data.id = crypto.randomUUID();
            users.add(data);
            res.writeHead(201);
            res.end(JSON.stringify(data))
        } else {
            res.writeHead(400);
            res.end('Invalid param')
        }
    } catch {
        res.writeHead(400);
        res.end('Bad request')
    }
}

export const deleteUser = (res: http.ServerResponse, params: string[]): void => {

    if (params.length === 0 || !params[0].match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        res.writeHead(400);
        res.end('Invalid param')
        return
    } else {
        const [userId] = params;

        if (Array.from(users).filter(x => x['id'] === userId).length === 0) {
            res.writeHead(404);
            res.end('User does not exist')
            return
        }

        users.forEach((user) => {
            if (user['id'] === userId) {
                users.delete(user);
            }
        })

        res.statusCode = 204;
        res.end()
    }
}

export const putUser = async (req: http.IncomingMessage, res: http.ServerResponse, params: string[]): Promise<void> => {
    if (params.length === 0 || !params[0].match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        res.writeHead(400);
        res.end('Invalid param')
        return
    } else {
        const [userId] = params;

        if (Array.from(users).filter(x => x['id'] === userId).length === 0) {
            res.writeHead(404);
            res.end('User does not exist')
            return
        }

        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }
        console.log(Buffer.concat(buffers).toString())

        try {
            const data = JSON.parse(Buffer.concat(buffers).toString());

            if ((data['username'] && typeof data['username'] === 'string')
                && (data['age'] && typeof data['age'] === 'number')
                && (data['hobbies'] && Array.isArray(data['hobbies']))) {

                users.forEach((user) => {
                    if (user['id'] === userId) {
                        user['username'] = data['username'];
                        user['age'] = data['age'];
                        user['hobbies'] = data['hobbies'];
                    }
                })

                res.writeHead(200);
                res.end(JSON.stringify(data))
            } else {
                res.writeHead(400);
                res.end('Invalid param')
            }
        } catch {
            res.writeHead(400);
            res.end('Bad request')
        }
    }
}

export const apiNotFound = (res: http.ServerResponse) => {
    res.writeHead(404);
    res.end('API not found');
}