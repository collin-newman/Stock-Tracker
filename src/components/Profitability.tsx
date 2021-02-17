import React from 'react';
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
  const handleClick = (e: any) => {
    const id = (e.target as Element).getAttribute('data-id');
    deleteStock(id);
  };

  return (
    <>
      <Table striped bordered hover variant="dark" className='centerText'>
        <thead>
          <OverlayTrigger
            placement='auto'
            delay={{ show: 250, hide: 400 }}
            overlay={renderTableDescription}
          >
            <th colSpan={3}>Profitability</th>
          </OverlayTrigger>
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
              <Button
                onClick={handleClick}
                className='myButton'
                variant='outline-light'
                data-id={stock._id}
              >
                <span>{stock.ticker}</span>
              </Button>
              <td>{Math.round(((stock.revenue - stock.costOfRevenue) / stock.revenue) * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Profitability;