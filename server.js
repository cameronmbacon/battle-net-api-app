const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true }, () => console.log('Connected to MongoDB via mongoose.js'));

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (request, response) => {
    response.send({ hello: 'World!', deployed_on: 'Heroku' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Express server up on PORT ' + PORT);
});