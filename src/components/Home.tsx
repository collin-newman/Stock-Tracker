import React, { useEffect, useState } from 'react';
import Breakdown from './Breakdown';
import TickerSearch from './TickerSearch';
import EquationInputs from './EquationInput';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const getData = () => {
    axios.get('http://localhost:3000/api/stock')
      .then(res => {
        setStocks(res.data);
      })
      .catch(err => console.log(err));
  }
  const deleteStock = (id: string) => {
    axios.delete(`http://localhost:3000/api/stock/${id}`)
      .then(() => getData())
      .catch(error => console.log(error));
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, stocks);

  return (
    <Container>
      <TickerSearch getData={getData}/>
      <Breakdown stocks={stocks} deleteStock={deleteStock} />
      <EquationInputs stocks={stocks} deleteStock={deleteStock} />
    </Container>
  );
}

export default Home;