import * as mongoose from 'mongoose';
import * as connection from './index';
import * as express from 'express';
import axios from 'axios';

export interface Stock extends mongoose.Document {
  ticker: string;
  assests: number;
  liabilities: number;
  equity: number;
  debt: number;
  revenue: number;
  costOfRevenue: number;
};

export const stockSchema = new mongoose.Schema({
  ticker: { type: String, required: true },
  assests: { type: Number, required: true },
  liabilities: { type: Number, required: true },
  equity: { type: Number, required: true },
  debt: { type: Number, required: true },
  revenue: { type: Number, required: true },
  costOfRevenue: { type: Number, required: true }
});

const Stock = mongoose.model<Stock>('Stock', stockSchema);

export const findAll = (req: express.Request, res: express.Response) => {
  Stock.find()
    .then(data => res.send(data))
    .catch(err => res.send(err));
};

export const create = (req: express.Request, res:express.Response) => {
  const ticker: String = req.body.ticker;
  const options: object = {
    method: 'GET',
    url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials',
    params: {symbol: ticker.toUpperCase(), region: 'US'},
    headers: {
      'x-rapidapi-key': 'c4182ea640msh91c3897924ad99ap13e4f9jsn42bf788eaff9',
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    }
  };

  axios.request(options)
    .then(function (response) {
      console.log(response);
      // const {
      //   balanceSheetHistoryQuarterly: { balanceSheetStatements },
      //   incomeStatementHistoryQuarterly: { incomeStatementHistory },
      // } = response;

      // const stock: object = {

      // };

      // Stock.create(stock)
      // .then(data => res.send(data))
      // .catch(err => res.send(err));
    })
    .catch(function (error) {
      res.send(error);
    });
};

export const deleteStock = (req: express.Request, res:express.Response) => {
  const stockId = req.params.id;
  Stock.findOneAndDelete({ _id: stockId })
    .then(data => res.send(data))
    .catch(err => res.send(err));
};