import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface iStock {
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

interface iStocks {
  stocks: iStock[];
  deleteStock: any;
}

const EquationInputs = ({ stocks, deleteStock }: iStocks) => {
  const handleClick = (e: any) => {
    const id = (e.target as Element).getAttribute('data-id');
    deleteStock(id);
  };

  return (
    <>
      <Table striped bordered hover variant="dark" responsive className='centerText'>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Assets</th>
            <th>Cash Flow</th>
            <th>Revenue</th>
            <th>Cost Of Revenue</th>
            <th>Liabilities</th>
            <th>Equity</th>
            <th>Debt</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock: iStock) => (
            <tr>
              <td>
                <Button
                  onClick={handleClick}
                  className='myButton'
                  variant='outline-light'
                  data-id={stock._id}
                >
                  <span>{stock.ticker}</span>
                </Button>
              </td>
              <td>{stock.assets}</td>
              <td>{stock.cashFlow}</td>
              <td>{stock.revenue}</td>
              <td>{stock.costOfRevenue}</td>
              <td>{stock.liabilities}</td>
              <td>{stock.equity}</td>
              <td>{stock.debt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default EquationInputs;
