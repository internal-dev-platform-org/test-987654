const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/v1/someapi',
        createProxyMiddleware({
            target: 'https://jsonplaceholder.typicode.com',
            secure: false,
            changeOrigin: true,
        }),
    )
};
