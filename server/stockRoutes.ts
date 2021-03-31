import * as express from 'express';
import * as Stock from '../database/stockController';

const stockRouter: express.Router = express.Router();

stockRouter.get('/', async (req: express.Request, res: express.Response) => {
  console.log('GET');
  const stocks = await Stock.findAll();
  res.send(stocks);
});

stockRouter.post('/', async (req: express.Request, res: express.Response) => {
  console.log('Post');
  const { ticker } = req.body;
  const newStock = await Stock.create(ticker);
  res.send(newStock);
});

stockRouter.get('/stockList', async (req: express.Request, res: express.Response) => {
  const stocks = req.body.stocks;
  const stockList = await Stock.findStockList(stocks);
  res.send(stockList);
});

stockRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
  console.log('Delete');
  const { id } = req.params;
  const deleted = await Stock.deleteStock(id);
  if (deleted) {
    res.send('delted');
  } else {
    res.status(400).send('Stock not found');
  }
});

export default stockRouter;