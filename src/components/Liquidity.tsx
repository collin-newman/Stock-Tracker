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

const tableDescription = (props: any) => (
  <Tooltip {...props}>
    <p>Tech companies often don't make a profit or any revenue until they are very mature, they often put more focus on short term goals with the hope that once their product is fully developed they will be able to make up for years of losses. This means the ability to pay for short term obligations is crutial to a tech companies success. Liquidity ratios are what describe the companies ability to pay for these short term obligations.</p>
  </Tooltip>
);

const renderCurrentRatio = (props: any) => (
  <Tooltip {...props}>
    (Current Assets / Current Liabilities)
  </Tooltip>
);

const renderCashFlow = (props: any) => (
  <Tooltip {...props}>
    (Operating Cash Flow / Current Liabilities)
  </Tooltip>
);

const Liquidity = ({ stocks, deleteStock }: iStocks) => {

  const currentRatioLimit = Number(window.localStorage.getItem('currentRatioLimit'));
  const cashFlowRatioLimit = Number(window.localStorage.getItem('cashFlowRatioLimit'));

  interface iLimit {
    current: number | null;
    cashFlow: number | null;
  };

  const liquidityLimits: iLimit = {
    current: currentRatioLimit,
    cashFlow: cashFlowRatioLimit,
  };
  const initialLimit = {
    cashFlow: null,
    current: null,
  };
  const [limit, setLimit] = useState<iLimit>(liquidityLimits || initialLimit);

  const handleClick = (e: any) => {
    const id = (e.target as Element).getAttribute('data-id');
    deleteStock(id);
  };

  const updateLimit = (e: any) => {
    const ratio = (e.target as Element).getAttribute('data-ratio');
    if (ratio === 'current') {
      const newLimit = limit;
      newLimit.current = e.target.value;
      window.localStorage.setItem('currentRatioLimit', e.target.value);
      console.log(limit, newLimit);
      setLimit(newLimit);
    }
    if (ratio === 'cashFlow') {
      console.log('updateing cash flow');
      const newLimit = limit;
      newLimit.cashFlow = e.target.value;
      window.localStorage.setItem('cashFlowLimit', e.target.value);
      setLimit(newLimit);
    }
  };

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
              <th>
                <p>Current Ratio</p>
                <input className='headerInput' type='number' placeholder='limit' step='0.1' onChange={updateLimit} value={limit.current || ''} data-ratio='current'/>
              </th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderCashFlow}
            >
              <th>
                <p>Operating Cash Flow Ratio</p>
                <input className='headerInput' type='number' placeholder='limit' step='0.1' onChange={updateLimit} value={limit.cashFlow || ''} data-ratio='cashFlow'/>
              </th>
            </OverlayTrigger>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock: iStock) => {
            const currentRatio = Math.round((stock.assets / stock.liabilities) * 100) / 100;
            const cashFlowRatio = Math.round((stock.cashFlow / stock.liabilities) * 100) / 100;
            let currentTextColor = 'white';
            let cashFlowTextColor = 'white';
            if (limit.current) {
              currentTextColor = currentRatio < limit.current ? 'red' : 'white';
            }
            if (limit.cashFlow) {
              cashFlowTextColor = cashFlowRatioLimit < limit.cashFlow ? 'red' : 'white';
            }

            return (
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
                <td style={{ color: currentTextColor }}>{currentRatio}</td>
                <td style={{ color: cashFlowTextColor }}>{cashFlowRatio}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Liquidity;
