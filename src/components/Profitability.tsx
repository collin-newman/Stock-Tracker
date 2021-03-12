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
    A high gross profit margin is a signal that once the company scales,
    it could become very profitable. A low gross profit margin is a signal
    the company is unable to become profitable.
  </Tooltip>
);

const renderEquation = (props: any) => (
  <Tooltip {...props}>
    (sale - cost of sales) / sales
  </Tooltip>
);


const Profitability = ({ stocks, deleteStock }: iStocks) => {

  const windowLimit = Number(window.localStorage.getItem('profitabilityRatioLimit'));
  const [limit, setLimit] = useState<number | null>(windowLimit || null);

  const handleClick = (e: any) => {
    const id = (e.target as Element).getAttribute('data-id');
    deleteStock(id);
  };

  const updateLimit = (e: any) => {
    setLimit(e.target.value);
    window.localStorage.setItem('profitabilityRatioLimit', e.target.value);
  };

  return (
    <>
      <Table striped bordered hover variant="dark" className='centerText'>
        <thead>
          <tr>
            <OverlayTrigger
              placement='auto'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTableDescription}
            >
              <th colSpan={3}>Profitability</th>
            </OverlayTrigger>
          </tr>
          <tr>
            <th>Stock</th>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderEquation}
            >
              <th>
                <p>Gross Profit Margin</p>
                <input className='headerInput' type='number' placeholder='limit' step='0.1' onChange={updateLimit} value={limit || ''}/>
              </th>
            </OverlayTrigger>
          </tr>
        </thead>
        <tbody>
        {stocks.map((stock: iStock) => {
          const profitabilityRatio = Math.round(((stock.revenue - stock.costOfRevenue) / stock.revenue) * 100) / 100;
          let textColor = 'white';
          if (limit) {
            textColor = profitabilityRatio < limit ? 'red' : 'white';
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
              <td style={{ color: textColor }}>{profitabilityRatio}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    </>
  );
};

export default Profitability;