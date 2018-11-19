const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (request, response) => {
    response.send({ hello: 'World!', deployed_on: 'Heroku' });
});

app.listen(PORT, () => {
    console.log('Server up on PORT ' + PORT);
});