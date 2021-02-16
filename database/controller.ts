import * as mongoose from 'mongoose';
import * as db from './index';
import * as express from 'express';
import axios from 'axios';

db;

export interface Stock extends mongoose.Document {
  ticker: string;
  assets: number;
  liabilities: number;
  equity: number;
  debt: number;
  revenue: number;
  costOfRevenue: number;
};

export const stockSchema = new mongoose.Schema({
  ticker: { type: String, required: true },
  assets: { type: Number, required: true },
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
  const ticker: string = req.body.ticker;
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
      const {
        balanceSheetHistoryQuarterly: { balanceSheetStatements },
        incomeStatementHistoryQuarterly: { incomeStatementHistory },
      } = response.data;

      // some stock tickers seem to be missing a metric here and there for a
      // specific quarter so i need to check if the metric exists for the quarter
      // and then average it according to how many data points were received
      const getMetrics = () => {
        interface counter {
          value: number;
          count: number;
        }
        interface balanceMetrics {
          totalAssets: counter;
          totalLiab: counter;
          totalStockholderEquity: counter;
          longTermDebt: counter;
          [key: string]: counter;
        };
        interface incomeMetrics {
          totalRevenue: counter;
          costOfRevenue: counter;
          [key: string]: counter;
        }
        const balanceSheetMetrics: balanceMetrics = {
          totalAssets: { value: 0, count: 0 },
          totalLiab: { value: 0, count: 0 },
          totalStockholderEquity: { value: 0, count: 0 },
          longTermDebt: { value: 0, count: 0 },
        };

        const incomeStatementMetrics: incomeMetrics = {
          totalRevenue: { value: 0, count: 0 },
          costOfRevenue: { value: 0, count: 0 },
        }

        for (let i = 0; i < 4; i++) {
          for (let key in balanceSheetMetrics) {
            console.log(balanceSheetStatements[i][key]);
            if (balanceSheetStatements[i][key] !== undefined) {
              balanceSheetMetrics[key].value += balanceSheetStatements[i][key].raw;
              balanceSheetMetrics[key].count++;
            }
          }
          for (let key in incomeStatementMetrics) {
            console.log(incomeStatementHistory[i][key]);
            if (incomeStatementHistory[i][key] !== undefined) {
              incomeStatementMetrics[key].value += incomeStatementHistory[i][key].raw
              incomeStatementMetrics[key].count++;
            }
          }
        }

        const { totalAssets, totalLiab, totalStockholderEquity, longTermDebt } = balanceSheetMetrics;
        const { totalRevenue, costOfRevenue } = incomeStatementMetrics;

        const avgAssets: number = totalAssets.value / totalAssets.count;
        const avgLiabilities: number = totalLiab.value / totalLiab.count;
        const avgEquity: number = totalStockholderEquity.value / totalStockholderEquity.count;
        const avgDebt: number = longTermDebt.value / longTermDebt.count;
        const avgRevenue: number = totalRevenue.value / totalRevenue.count;
        const avgCostOfRevenue: number = costOfRevenue.value / costOfRevenue.count;

        return {
          avgAssets,
          avgLiabilities,
          avgEquity,
          avgDebt,
          avgRevenue,
          avgCostOfRevenue,
        };
      }

      const { avgAssets, avgLiabilities, avgEquity, avgDebt, avgRevenue, avgCostOfRevenue } = getMetrics();
      const stock: object = {
        ticker,
        assets: avgAssets,
        liabilities: avgLiabilities,
        equity: avgEquity,
        debt: avgDebt,
        revenue: avgRevenue,
        costOfRevenue: avgCostOfRevenue
      };
      Stock.create(stock)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });
};

export const deleteStock = (req: express.Request, res: express.Response) => {
  const stockId = req.params.id;
  Stock.findOneAndDelete({ _id: stockId })
    .then(data => res.send(data))
    .catch(err => res.send(err));
};