const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/bnet', passport.authenticate('bnet', {
        scope: ['wow.profile']
    }));
    
    app.get('/auth/bnet/callback', passport.authenticate('bnet'));

    app.get('/api/logout', (request, response) => {
        request.logout();
        response.send(request.user);
    });

    app.get('/api/current_user', (request, response) => {
        response.send(request.user);
    });
};
