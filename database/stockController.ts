import * as mongoose from 'mongoose';
import db from './index';
import * as express from 'express';
import axios from 'axios';
import * as keys from '../keys/api_key.json';

db;

interface iStockDocument extends mongoose.Document {
  ticker: string;
  assets: number;
  liabilities: number;
  equity: number;
  debt: number;
  revenue: number;
  costOfRevenue: number;
  cashFlow: number;
  lastUpdated: Date;
};

interface iStock {
  ticker: string;
  assets: number;
  liabilities: number;
  equity: number;
  debt: number;
  revenue: number;
  costOfRevenue: number;
  cashFlow: number;
  lastUpdated: Date;
};

const stockSchema = new mongoose.Schema({
  ticker: { type: String, required: true, unique: true },
  assets: { type: Number, required: true },
  liabilities: { type: Number, required: true },
  equity: { type: Number, required: true },
  debt: { type: Number, required: true },
  revenue: { type: Number, required: true },
  costOfRevenue: { type: Number, required: true },
  cashFlow: { type: Number, required: true },
  lastUpdated: { type: Date, required: true },
});

const Stock = mongoose.model<iStockDocument>('Stock', stockSchema);

export const findAll = async () => {
  try {
    const data = await Stock.find();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const create = async (ticker: string) => {
  const options: object = {
    method: 'GET',
    url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials',
    params: {symbol: ticker.toUpperCase(), region: 'US'},
    headers: {
      'x-rapidapi-key': keys.api_key,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    }
  };

  return axios.request(options)
    .then(async (response) => {
      const {
        balanceSheetHistoryQuarterly: { balanceSheetStatements },
        incomeStatementHistoryQuarterly: { incomeStatementHistory },
        cashflowStatementHistory: { cashflowStatements },
      } = response.data;

      // some stock tickers seem to be missing a metric here and there for a
      // specific quarter so i need to check if the metric exists for the quarter
      // and then average it according to how many data points were received
      const getMetrics = () => {
        interface counter {
          value: number;
          count: number;
        };
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
        };

        interface cashFlowMetrics {
          totalCashFromOperatingActivities: counter;
          [key: string]: counter;
        };

        const balanceSheetMetrics: balanceMetrics = {
          totalAssets: { value: 0, count: 0 },
          totalLiab: { value: 0, count: 0 },
          totalStockholderEquity: { value: 0, count: 0 },
          longTermDebt: { value: 0, count: 0 },
        };

        const incomeStatementMetrics: incomeMetrics = {
          totalRevenue: { value: 0, count: 0 },
          costOfRevenue: { value: 0, count: 0 },
        };

        const cashFlowMetrics: cashFlowMetrics = {
          totalCashFromOperatingActivities: { value: 0, count: 0 },
        };

        for (let i = 0; i < 4; i++) {
          for (let key in balanceSheetMetrics) {
            if (balanceSheetStatements[i][key] !== undefined) {
              balanceSheetMetrics[key].value += balanceSheetStatements[i][key].raw;
              balanceSheetMetrics[key].count++;
            }
          }
          for (let key in incomeStatementMetrics) {
            if (incomeStatementHistory[i][key] !== undefined) {
              incomeStatementMetrics[key].value += incomeStatementHistory[i][key].raw
              incomeStatementMetrics[key].count++;
            }
          }
          for (let key in cashFlowMetrics) {
            if (cashflowStatements[i][key]) {
              cashFlowMetrics[key].value += cashflowStatements[i][key].raw;
              cashFlowMetrics[key].count++;
            }
          }
        }

        const { totalAssets, totalLiab, totalStockholderEquity, longTermDebt } = balanceSheetMetrics;
        const { totalRevenue, costOfRevenue } = incomeStatementMetrics;
        const { totalCashFromOperatingActivities, } = cashFlowMetrics;

        const avgAssets: number = totalAssets.value / totalAssets.count;
        const avgLiabilities: number = totalLiab.value / totalLiab.count;
        const avgEquity: number = totalStockholderEquity.value / totalStockholderEquity.count;
        const avgDebt: number = longTermDebt.value / longTermDebt.count;
        const avgRevenue: number = totalRevenue.value / totalRevenue.count;
        const avgCostOfRevenue: number = costOfRevenue.value / costOfRevenue.count;
        const avgCashFlow: number = totalCashFromOperatingActivities.value / totalCashFromOperatingActivities.count;

        return {
          avgAssets,
          avgLiabilities,
          avgEquity,
          avgDebt,
          avgRevenue,
          avgCostOfRevenue,
          avgCashFlow,
        };
      }

      const { avgAssets, avgLiabilities, avgEquity, avgDebt, avgRevenue, avgCostOfRevenue, avgCashFlow } = getMetrics();
      const stock: iStock = {
        ticker: ticker.toUpperCase(),
        assets: avgAssets,
        liabilities: avgLiabilities,
        equity: avgEquity,
        debt: avgDebt,
        revenue: avgRevenue,
        costOfRevenue: avgCostOfRevenue,
        cashFlow: avgCashFlow,
        lastUpdated: new Date(Date.now()),
      };
      try {
        const newStock = await Stock.create(stock);
        console.log(newStock);
        return newStock;
      } catch (err) {
        console.log('Error creating new stock', stock);
        console.log(err);
        return null;
      }
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
};

export const deleteStock = async (id: string) => {
  try {
    const data = await Stock.findOneAndDelete({ _id: id });
    return data;
  } catch (err) {
    console.log('Error deleting entry with id:', id);
    return null;
  }
};

export const deleteAll = async () => {
  try {
    const result = await Stock.deleteMany({});
    return result;
  } catch (err) {
    console.log('Error deleting all');
    return null;
  }
};

export const findStockList = async (stocks: string[]) => {
  const stockList: any = [];
  const queries: any = [];

  stocks.forEach((ticker) => {
    queries.push(
      Stock.findOne({ 'ticker': ticker })
        .then(async (response) => {
          if (response) {
            console.log(response);
            stockList.push(response);
          } else {
            const newStock = await create(ticker);
            if (newStock) {
              stockList.push(newStock);
            }
          }
        })
        .catch((error) => {
          console.log('Error findind stock ticker');
        })
    );
  });

  return Promise.all(queries)
    .then(() => {
      return stockList;
    })
    .catch((err) => {
      console.log('Error finding the following stocks', stocks);
      console.log(err);
      return [];
    });
};