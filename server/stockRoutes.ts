import * as express from 'express';
import * as Stock from '../database/stockController';

const stockRouter: express.Router = express.Router();

stockRouter.get('/', (req: express.Request, res: express.Response) => {
  console.log('GET');
  Stock.findAll(req, res);
});

stockRouter.post('/', (req: express.Request, res: express.Response) => {
  console.log('Post');
  Stock.create(req, res);
});

stockRouter.delete('/:id', (req: express.Request, res: express.Response) => {
  console.log('Delete');
  console.log(req.params.id);
  Stock.deleteStock(req, res);
});

export default stockRouter;