import * as express from 'express';
import * as passport from 'passport';
import * as Stock from '../database/stockController';
import * as User from '../database/userController';
const parser = require('body-parser');

const app: express.Application = express();
const port = 3000;

app.use(parser.urlencoded());
app.use(parser.json());
app.use(express.static('dist'));
app.use(passport.initialize());

app.post('/api/signup', (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  User.create({ username, password }, req, res);
});

app.post('/api/login', (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  User.login({ username, password }, req, res);
});

app.get('/api/stock', (req: express.Request, res: express.Response) => {
  console.log('GET');
  Stock.findAll(req, res);
});

app.post('/api/stock', (req: express.Request, res: express.Response) => {
  console.log('Post');
  Stock.create(req, res);
});

app.delete('/api/stock/:id', (req, res) => {
  console.log('Delete');
  console.log(req.params.id);
  Stock.deleteStock(req, res);
});

app.listen(port, () => {
  console.log('Listening on port ', port);
});
