const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/v1/someapi',
        createProxyMiddleware({
            target: 'https://api-server-for-proxy.com',
            secure: false,
            changeOrigin: true,
        }),
    )
};
