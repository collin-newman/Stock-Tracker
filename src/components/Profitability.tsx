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

const renderEquation = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    (sale - cost of sales) / sales
  </Tooltip>
);


const Profitability = ({ stocks, deleteStock }: iStocks) => {
  return (
    <>
      <Table striped bordered hover variant="dark" className='centerText'>
        <thead>
          <th colSpan={3}>Profitability</th>
          <tr>
            <th>Stock</th>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderEquation}
            >
              <th>Gross Profit Margin</th>
            </OverlayTrigger>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock: iStock) => (
            <tr>
              <td>{stock.ticker}</td>
              <td>{Math.round(((stock.revenue - stock.costOfRevenue) / stock.revenue) * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Profitability;