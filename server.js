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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/client/build'));
    
    const path = require('path');   
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Express server up on PORT ' + PORT);
});