import React from 'react';
import Liquidity from './Liquidity';
import FinancialLeverage from './FinancialLeverage';
import Profitability from './Profitability';

const Breakdown = () => {
  return (
    <section>
      <h2>Financial Breakdown</h2>
      <Liquidity />
      <FinancialLeverage />
      <Profitability />
    </section>
  );
}

export default Breakdown;