import * as express from 'express';
import * as User from '../database/userController';
import { findStockList } from '../database/stockController';

const userRouter: express.Router = express.Router();

userRouter.post('/signup', async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  const result = await User.create({ username, password });
  if (result) {
    if (result === 'server error') {
      res.status(500).send('server error');
    } else {
      res.send('successful signup');
    }
  } else {
    res.status(401).send('sorry that username is taken');
  }
});

userRouter.post('/login', async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  const result = await User.login({ username, password });
  if (result) {
    // successful login do session stuff here
    if (result === 'server error') {
      res.status(500).send('Internal error');
    } else if (result === 'invalid username') {
      res.status(403).send('invalid username');
    }
    res.send('successful login');
  } else {
    res.send('Incorrect password');
  }
});

userRouter.post('/addStock', async (req: express.Request, res: express.Response) => {
  const { username, stock } = req.body;
  const stocks = await User.addStock(stock, username);
  if (stocks) {
    const stockList = await findStockList(stocks);
    res.send(stockList);
  } else {
    res.status(500).send(`Error adding ${stock} to you watch list`);
  }
});

export default userRouter;