import React from 'react';
import Breakdown from './Breakdown';
import TickerSearch from './TickerSearch';

const App = () => {
  return (
    <>
      <h1>Stock Funamentals</h1>
      <TickerSearch />
      <Breakdown />
    </>
  );
}

export default App;