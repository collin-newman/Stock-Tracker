import React from 'react';
import Table from 'react-bootstrap/Table'

interface iStock {
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
  stocks: iStock[];
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
          {stocks.map((stock: iStock) => (
            <tr>
              <td>{stock.ticker}</td>
              <td>{Math.round((stock.debt / stock.equity) * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default FinancialLeverage;