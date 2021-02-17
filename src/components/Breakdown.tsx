import React from 'react';
import Liquidity from './Liquidity';
import FinancialLeverage from './FinancialLeverage';
import Profitability from './Profitability';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';

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
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Fundamentals at a glance</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Liquidity stocks={stocks} deleteStock={deleteStock}/>
          </ListGroup.Item>
          <ListGroup.Item>
            <FinancialLeverage stocks={stocks} deleteStock={deleteStock}/>
          </ListGroup.Item>
          <ListGroup.Item>
            <Profitability stocks={stocks} deleteStock={deleteStock}/>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </section>
  );
}

export default Breakdown;