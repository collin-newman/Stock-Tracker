import * as express from 'express';
import * as Stock from '../database/stockController';

export const stockRouter: express.Router = express.Router();

stockRouter.get('/api/stock', (req: express.Request, res: express.Response) => {
  console.log('GET');
  Stock.findAll(req, res);
});

stockRouter.post('/api/stock', (req: express.Request, res: express.Response) => {
  console.log('Post');
  Stock.create(req, res);
});

stockRouter.delete('/api/stock/:id', (req: express.Request, res: express.Response) => {
  console.log('Delete');
  console.log(req.params.id);
  Stock.deleteStock(req, res);
});

module.exports = stockRouter;