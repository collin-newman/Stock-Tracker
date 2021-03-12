import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
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

const renderTableDescription = (props: any) => (
  <Tooltip {...props}>
    Financial leverage ratios measure the long term solvency of a company.
    If these ratios are too high it may mean the company will go under due to high
    debt before it has the chance to turn a profit.
  </Tooltip>
);

const renderEquation = (props: any) => (
  <Tooltip {...props}>
    (Debt / Equity)
  </Tooltip>
);


const FinancialLeverage = ({ stocks, deleteStock }: iStocks) => {
  const windowLimit = Number(window.localStorage.getItem('debtToEquityLimit'));
  const [limit, setLimit] = useState<number | null>(windowLimit || null);

  const handleClick = (e: any) => {
    const id = (e.target as Element).getAttribute('data-id');
    deleteStock(id);
  };

  const updateLimit = (e: any) => {
    setLimit(e.target.value);
    window.localStorage.setItem('debtToEquityLimit', e.target.value);
  };

  return (
    <>
      <Table striped bordered hover variant="dark" responsive className='centerText'>
        <thead>
          <tr>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTableDescription}
            >
              <th colSpan={3}>Financial Leverage</th>
            </OverlayTrigger>
          </tr>
          <tr>
            <th>Stock</th>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderEquation}
            >
              <th className='centerByCol'>
                <p>Debt To Equity Ratio</p>
                <input className='headerInput' type='number' placeholder='limit' step='0.1' onChange={updateLimit} value={limit || ''}/>
              </th>
            </OverlayTrigger>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock: iStock) => {
            const debtToEquityRatio: number = Math.round((stock.debt / stock.equity) * 100) / 100;
            let textColor = 'white';
            if (limit) {
              textColor = debtToEquityRatio < limit ? 'red' : 'white';
            }
            return (
              <tr>
                <Button
                  onClick={handleClick}
                  className='myButton'
                  variant='outline-light'
                  data-id={stock._id}
                >
                  <span>{stock.ticker}</span>
                </Button>
                <td style={{color: textColor}}>{debtToEquityRatio}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default FinancialLeverage;