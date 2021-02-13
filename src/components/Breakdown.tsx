import * as React from 'react';

const Breakdown = () => {
  return (
    <section>
      <h2>Financial Breakdown</h2>
      <table>
        <thead>
          <tr><th>Current Assets</th></tr>
          <tr><th>Current Liabilities</th></tr>
          <tr><th>Total Equity</th></tr>
          <tr><th>Total Debt</th></tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  );
}

export default Breakdown;