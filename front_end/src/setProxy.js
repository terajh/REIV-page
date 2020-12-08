const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/api', {
            target: 'http://terajoo.tk:3001/'
        }),
        proxy('/auth', {
            target: 'http://terajoo.tk:3001/'
        })
    )
}
