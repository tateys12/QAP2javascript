const http = require('http');
const EventEmitter = require('events');

const routes = require('./routes.js');

global.DEBUG = true;

class CustomEventEmitter extends EventEmitter {}

const server = http.createServer((request, response) => {
    if (DEBUG) console.log(request.url, request.method);
    let path = "./views/";
    let statusCode = 200; // Default status code

    switch (request.url) {
        case '/':
            path += 'index.html';
            routes.indexPage(path, response);
            console.log('Index page accessed successfully');
            customEmitter.emit('indexAccessed');
            break;
        case '/about':
            path += 'about.html';
            routes.aboutPage(path, response);
            console.log('About page accessed successfully');
            customEmitter.emit('aboutAccessed');
            break;
        case '/contact':
            path += 'contact.html';
            routes.contactPage(path, response);
            console.log('Contact page accessed successfully');
            customEmitter.emit('contactAccessed');
            break;
        case '/products':
            path += 'products.html';
            routes.productsPage(path, response);
            console.log('Products page accessed successfully');
            customEmitter.emit('productsAccessed');
            break;
        case '/subscribe':
            path += 'subscribe.html';
            routes.subscribePage(path, response);
            console.log('Subscribe page accessed successfully');
            customEmitter.emit('subscribeAccessed');
            break;
        default:
            statusCode = 404; // Not Found
            console.log('404 - Page not found');
            customEmitter.emit('pageNotFound');
            break;
    }

    response.statusCode = statusCode;
});

const customEmitter = new CustomEventEmitter();

customEmitter.on('indexAccessed', () => {
    console.log('Custom event: Index page was accessed');
});

customEmitter.on('aboutAccessed', () => {
    console.log('Custom event: About page was accessed');
});

customEmitter.on('contactAccessed', () => {
    console.log('Custom event: Contact page was accessed');
});

customEmitter.on('productsAccessed', () => {
    console.log('Custom event: Products page was accessed');
});

customEmitter.on('subscribeAccessed', () => {
    console.log('Custom event: Subscribe page was accessed');
});

customEmitter.on('pageNotFound', () => {
    console.log('Custom event: Page not found');
});

server.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000.');
});
