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

const Profitability = ({ stocks }: iStocks) => {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Gross Profit Margin</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock: stock) => {
            <tr>
              <td>{stock.ticker}</td>
              <td>{stock.debt / stock.equity}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Profitability;