const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/bnet', passport.authenticate('bnet', {
        scope: ['wow.profile']
    }));
    
    app.get('/auth/bnet/callback', passport.authenticate('bnet'))
}
