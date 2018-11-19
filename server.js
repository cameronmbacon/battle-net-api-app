const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

app.get('/', (request, response) => {
    response.send({ hello: 'World!', deployed_on: 'Heroku' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server up on PORT ' + PORT));