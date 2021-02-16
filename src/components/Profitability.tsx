import React from 'react';
import Table from 'react-bootstrap/Table'

const Profitability = () => {
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
        </tbody>
      </Table>
    </>
  );
};

export default Profitability;