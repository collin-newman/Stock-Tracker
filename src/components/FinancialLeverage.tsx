import React from 'react';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
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
  cashFlow: number;
}

interface iStocks {
  stocks: iStock[];
  deleteStock: any;
}

const renderTableDescription = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    Financial leverage ratios measure the long term solvency of a company.
    If these ratios are too high it may mean the company will go under due to high
    debt before it has the chance to turn a profit.
  </Tooltip>
);

const renderEquation = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    (Debt / Equity)
  </Tooltip>
);


const FinancialLeverage = ({ stocks, deleteStock }: iStocks) => {
  return (
    <>
      <Table striped bordered hover variant="dark" className='centerText'>
        <thead>
          <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTableDescription}
          >
            <th colSpan={3}>Financial Leverage</th>
          </OverlayTrigger>
          <tr>
            <th>Stock</th>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderEquation}
            >
              <th>Debt To Equity Ratio</th>
            </OverlayTrigger>
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