const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const port = 7767;

const distPath = '../dist';
const contentPath = '/content';

const mimeType = {
    '.ttf':  'application/font-sfnt',
    '.json': 'application/json',
    '.doc':  'application/msword',
    '.pdf':  'application/pdf',
    '.eot':  'application/vnd.ms-fontobject',
    '.wav':  'audio/wav',
    '.mp3':  'audio/mpeg',
    '.jpg':  'image/jpeg',
    '.png':  'image/png',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.css':  'text/css',
    '.html': 'text/html',
    '.js':   'text/javascript',
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`)

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url.includes('api')) {
        handleAPIRequest(req, res);
    } else {
        handlePathRequest(req, res);
    }
});

const handleAPIRequest = (req, res) => {
    switch (req.url) {
        case 'api/recipes':
            handleGetRecipe(req, res);
            break;
        default:
            res.writeHead(500);
            res.end(`${req.url} error: Bad API path.`);
            break;
    }
};

const handlePathRequest = (req, res) => {
    const parsedUrl = url.parse(req.url);

    const sanitizedPath =
        path
        .normalize(parsedUrl.pathname)
        .replace(/^(\.\.[\/\\])+/, '');

    let pathName = path.join(__dirname, distPath, sanitizedPath);

    fs.exists(pathName, (exists) => {
        if (!exists) {
            res.writeHead(404);
            res.end(`${pathName} error: Not found.`);
            return;
        }

        if (fs.statSync(pathName).isDirectory()) {
            pathName += '/index.html';
        }

        fs.readFile(pathName, (error, data) => {
            if (error) {
                res.writeHead(500);
                res.end(`${pathName} error: ${error}`);
            } else {
                const extension = path.parse(pathName).ext;
                res.setHeader('Content-type', mimeType[extension] || 'text/plain');
                res.end(data);
            }
        })
    });
};

// TODO: extract to its own module
const handleGetRecipe = (req, res) => {
    // TODO: read recipe json and return it
};

server.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}`);
});
