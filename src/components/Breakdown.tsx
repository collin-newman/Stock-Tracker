import React from 'react';
import Liquidity from './Liquidity';
import FinancialLeverage from './FinancialLeverage';
import Profitability from './Profitability';

interface stock {
  _id: string;
  ticker: string;
  assets: number;
  liabilities: number;
  equity: number;
  debt: number;
  revenue: number;
  costOfRevenue: number;
}

interface iStocks {
  stocks: stock[];
}

const Breakdown = ({ stocks }: iStocks) => {
  return (
    <section>
      <h2>Financial Breakdown</h2>
      <Liquidity stocks={stocks} />
      <FinancialLeverage stocks={stocks} />
      <Profitability stocks={stocks} />
    </section>
  );
}

export default Breakdown;