import React, { useEffect, useState } from 'react';
import Breakdown from './Breakdown';
import TickerSearch from './TickerSearch';
import axios from 'axios';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const getData = () => {
    axios.get('http://localhost:3000/api/stock')
      .then(res => {
        console.log('hllo');
        setStocks(res.data);
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, stocks);

  return (
    <>
      <h1>Stock Funamentals</h1>
      <TickerSearch getData={getData}/>
      <Breakdown stocks={ stocks }/>
    </>
  );
}

export default App;