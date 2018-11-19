const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;
const keys = require('../config/keys');

passport.use(
    new BnetStrategy(
        {
            clientID: keys.BNET_ID,
            clientSecret: keys.BNET_SECRET,
            callbackURL: '/auth/bnet/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
        }
    )
);