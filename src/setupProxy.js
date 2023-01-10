const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

        app.use(
            createProxyMiddleware('/SilviaServer', { target: 'https://silviaserver.com' }),
            createProxyMiddleware('/blob', { target: 'https://208.109.188.242:2700' })
        );

    // app.use(
    //     '/SilviaServer',
    //     createProxyMiddleware({
    //         target: 'http://162.244.80.91:10870',
    //         changeOrigin: true,
    //     }),
    //     '/api/tts',
    //     createProxyMiddleware({
    //         target: 'http://208.109.188.242:5003',
    //         changeOrigin: true,
    //     })
    // );
};
