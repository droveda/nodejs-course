const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    res.setHeader('Content-type', 'text/html')

    if (url === '/') {
        res.write('<html>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.writeHead(302, {'Location': '/'});
                return res.end();
            });
        });
    }
        
    res.write('<html>');
    res.write('<h1>My first page!</h1>');
    res.write('</html>');
    res.end();

};

module.exports = {
    handler: requestHandler,
    someText: 'some hardcoded'
};

