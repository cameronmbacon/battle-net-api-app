const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new BnetStrategy(
        {
            clientID: keys.BNET_ID,
            clientSecret: keys.BNET_SECRET,
            callbackURL: '/auth/bnet/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ bnetId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User(
                        { 
                            bnetId: profile.id,
                            sub: profile.sub,
                            battletag: profile.battletag,
                            provider: profile.provider
                        })
                        .save()
                        .then(user => done(null, user));
                }
            });

        }
    )
);