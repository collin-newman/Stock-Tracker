const express = require('express');
const parser = require('body-parser');
const routes = require('./routes')

const app: Express.Application = express();
const port = 3000;

app.use(parser());
app.use(express.static('dist'));

app.get('/api/stock', (req, res) => {

});

app.post('/api/stock', (req, res) => {

});

app.listen(port, () => {
  console.log('Listening on port ', port);
});
