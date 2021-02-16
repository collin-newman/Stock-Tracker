import React from 'react';
import Table from 'react-bootstrap/Table'

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

const FinancialLeverage = ({ stocks }: iStocks) => {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Debt To Equity Ratio</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock: stock) => {
            <tr>
              <td>{stock.ticker}</td>
              <td>{(stock.revenue + stock.costOfRevenue) / stock.revenue}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </>
  );
};

export default FinancialLeverage;