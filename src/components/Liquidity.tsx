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

const Liquidity = ({ stocks }: iStocks) => {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Current Ratio</th>
            <th>Cash Ratio</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock: iStock) => (
            <tr>
              <td>{stock.ticker}</td>
              <td>{stock.assets / stock.liabilities}</td>
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