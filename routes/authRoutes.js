const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/bnet', passport.authenticate('bnet', {
        scope: ['wow.profile']
    }));
    
    app.get(
        '/auth/bnet/callback',
        passport.authenticate('bnet'),
        (request, response) => {
            response.redirect('/surveys');
        }
    );

    app.get('/api/logout', (request, response) => {
        request.logout();
        response.redirect('/');
    });

    app.get('/api/current_user', (request, response) => {
        response.send(request.user);
    });
};
