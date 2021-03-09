import React from 'react';
import Liquidity from './Liquidity';
import FinancialLeverage from './FinancialLeverage';
import Profitability from './Profitability';
import EquationInputs from './EquationInput';
import Card from 'react-bootstrap/Card'

interface stock {
  _id: string;
  ticker: string;
  assets: number;
  liabilities: number;
  equity: number;
  debt: number;
  revenue: number;
  costOfRevenue: number;
  cashFlow: number;
}

interface iBreakdown {
  stocks: stock[];
  deleteStock: any;
}

const Breakdown = ({ stocks, deleteStock }: iBreakdown) => {
  return (
    <section className='mainItem'>
      <Card style={{ width: '100%' }}>
        <h2>Fundamentals at a glance</h2>
        <Liquidity stocks={stocks} deleteStock={deleteStock}/>
        <FinancialLeverage stocks={stocks} deleteStock={deleteStock}/>
        <Profitability stocks={stocks} deleteStock={deleteStock} />
        <EquationInputs stocks={stocks} deleteStock={deleteStock} />
      </Card>
    </section>
  );
}

export default Breakdown;