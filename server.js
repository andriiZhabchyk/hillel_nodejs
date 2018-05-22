'use strict';

// dependencies
const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    fileType = require('file-type'),
    url = require('url');

const server = http.createServer();

// configuration
const ENVIRONMENT = process.env.NODE_ENV || 'development',
    PORT = process.env.PORT || 3000;

const { Transform } = require('stream');

const requestLog = fs.createWriteStream(path.join(__dirname, 'log', 'requests.log'), { flags: 'a' });

const allowedContentTypes = [
    'application/x-www-form-urlencoded',
    'application/json'
];

function createReadStream(pathToFile, res, reqUrl) {
    const fileStream = fs.createReadStream(pathToFile, {
        highWaterMark: 512
    });

    fileStream.once('data', (chunk) => {
        const readFileType = fileType(chunk);
        if (readFileType) {
            res.setHeader('Content-type', readFileType.mime);
        }
    });

    if (pathToFile.includes('tmpl')) {
        const fileName = reqUrl.slice(1, reqUrl.length),
            fileTemplateStr = new Transform({
                transform(chunk, encoding, callback) {
                    this.push(_.template(chunk)({file: fileName}));
                    callback();
                }
            });

        return fileStream.pipe(fileTemplateStr).pipe(res);
    }

    fileStream.pipe(res);
}

function checkIfFileExist(folder, file, res, reqUrl) {
    const folderPath = folder.split('/'),
        pathToFile = path.join(__dirname, ...folderPath, file);

    fs.open(pathToFile, 'r', (err, fb) => {
        if (err) {
            switch (err.code) {
                case 'ENOENT':
                    res.writeHead(404);
                    return res.end('File not found');

                default:
                    res.writeHead(500);
                    return res.end('Server error');
            }
        }

        createReadStream(pathToFile, res, reqUrl);
    });
}

function writeRequestsLog(chunk) {
    requestLog.write(chunk);
}

function getOneMessage(id, res) {
    const readDataStream = fs.createReadStream(path.join(__dirname, 'data.json'));

    let messages = '';
    readDataStream
        .on('data', (chunk) => {
            messages += chunk;
        })
        .on('end', () => {
            messages = JSON.parse(messages);
            const message = messages.find(msg => msg.id === id);

            if (!message) {
                res.writeHead(404);
                return res.end('Not found')
            }

            res.writeHead(200);
            res.end(JSON.stringify(message));
        });
}

server.on('request', (req, res) => {
    const reqParams = url.parse(req.url, true);
    req.started = Date.now();

    res.on('finish', () => {
        writeRequestsLog(`${new Date(req.started).toLocaleTimeString()} ${req.method} ${req.url} ${Date.now() - req.started}ms ${res.statusCode} ${req.headers['user-agent']} \n`);
    });

    switch (req.method) {
        case 'GET':

            if (reqParams.pathname === '/favicon.ico') {
                checkIfFileExist('assets/img', 'favicon.ico', res);

            } else if (reqParams.pathname === '/') {
                checkIfFileExist('view', 'index.html', res);

            } else if (/^\/\w+\.\w+$/g.test(reqParams.pathname)) {
                checkIfFileExist('view', 'image.tmpl.html', res, req.url);

            } else if ((reqParams.pathname).includes('assets/img')) {
                checkIfFileExist(req.url, '', res);

            } else if (reqParams.pathname === '/message') {
                getOneMessage(+reqParams.query.id, res);
            }

            break;

        case 'POST':
            if (req.url === '/') {
                let message = '',
                    messages = '';

                if (allowedContentTypes.includes(req.headers['content-type'])) {

                    const readDataStream = fs.createReadStream(path.join(__dirname, 'data.json'));

                    const xWwwUrlTransform = new Transform({
                        readableObjectMode: true,
                        writableObjectMode: true,

                        transform(chunk, encoding, callback) {
                            const obj = {};
                            const messageBody = chunk.toString().split('&');
                            for(let i=0; i < messageBody.length; i++) {
                                let messageItemProp = messageBody[i].split('=');
                                obj[messageItemProp[0]] = messageItemProp[1];
                            }
                            this.push(JSON.stringify(obj));
                            callback();
                        }
                    });

                    const jsonBodyTransform = new Transform({
                        transform(chunk, encoding, callback) {
                            this.push(chunk);
                            callback();
                        }
                    });

                    req
                        .pipe(req.headers['content-type'] === 'application/json' ? jsonBodyTransform : xWwwUrlTransform)
                        .on('data', (messageChunk) => {
                            message += messageChunk;
                        })
                        .on('end', () => {
                            process.stdin
                                .pipe(readDataStream)
                                .on('data', (messagesChunk) => {
                                    messages += messagesChunk;
                                })
                                .on('end', () => {
                                    const writeDataStream = fs.createWriteStream(path.join(__dirname, 'data.json'));

                                    message = JSON.parse(message);
                                    if (!messages) {
                                        message['id'] = 1;
                                        writeDataStream.write(JSON.stringify([message]));
                                    } else {
                                        messages = JSON.parse(messages);
                                        message['id'] = messages.length + 1;
                                        messages.push(message);
                                        writeDataStream.write(JSON.stringify(messages));
                                    }

                                    writeDataStream.on('end', () => {
                                       writeDataStream.end();
                                    });

                                    res.end(JSON.stringify({message: 'Message added successful', _id: message.id}));
                                });
                        });
                } else {
                    res.writeHead(400);
                    res.end('Wrong type');
                }
            } else {
                res.writeHead(404);
                res.end();
            }
            break;

        default:
            res.writeHead(405);
            res.end();
    }
});

server.on('response', (req, res) => {
   console.log(req, res);
});

server.listen(PORT, () => {
    if (ENVIRONMENT === 'development') {
        console.log(`Server started in development mode`);
    }
    console.log(`Server started on port: ${PORT}`);
});