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

const tableDescription = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    <p>Tech companies often don't make a profit or any revenue until they are very mature, they often put more focus on short term goals with the hope that once their product is fully developed they will be able to make up for years of losses. This means the ability to pay for short term obligations is crutial to a tech companies success. Liquidity ratios are what describe the companies ability to pay for these short term obligations.</p>
  </Tooltip>
);

const renderCurrentRatio = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    (Current Assets / Current Liabilities)
  </Tooltip>
);

const renderCashFlow = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    (Operating Cash Flow / Current Liabilities)
  </Tooltip>
);

const Liquidity = ({ stocks, deleteStock }: iStocks) => {
  const handleClick = (e: any) => {
    const id = (e.target as Element).getAttribute('data-id');
    deleteStock(id);
  }

  return (
    <>
      <Table striped bordered hover variant="dark" className='centerText'>
        <thead>
          <tr>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={tableDescription}
            >
              <th colSpan={3}>Liquidity Ratios</th>
            </OverlayTrigger>
          </tr>
          <tr>
            <th>Stock</th>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderCurrentRatio}
            >
              <th>Current Ratio</th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderCashFlow}
            >
              <th>Operating Cash Flow Ratio</th>
            </OverlayTrigger>
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
              <td>{Math.round((stock.assets / stock.liabilities) * 100) / 100}</td>
              <td>{Math.round((stock.cashFlow / stock.liabilities) * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Liquidity;


/*

mouse over table shows this:

<p>Tech companies often don't make a profit or any revenue until they are very mature, they often put more focus on short term goals with the hope that once their product is fully developed they will be able to make up for years of losses. This means the ability to pay for short term obligations is crutial to a tech companies success. Liquidity ratios are what describe the companies ability to pay for these short term obligations.</p>
<p>Current Ratio (current assets / current liabilities)</p>

mouse over ratio give formula
(assets / liabilies)
(cash + markable securities / liabilites)

*/