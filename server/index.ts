import * as express from 'express';
import * as Stock from '../database/controller';
const parser = require('body-parser');

const app: express.Application = express();
const port = 3000;

app.use(parser.urlencoded());
app.use(parser.json());
app.use(express.static('dist'));

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
