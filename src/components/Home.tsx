import React, { useEffect, useState } from 'react';
import Breakdown from './Breakdown';
import TickerSearch from './TickerSearch';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

const url = process.env.HOST || 'http://localhost:3000';

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const getData = () => {
    axios.get(`${url}/api/stock`)
      .then(res => {
        setStocks(res.data);
      })
      .catch(err => console.log(err));
  }
  const deleteStock = (id: string) => {
    axios.delete(`${url}/api/stock/${id}`)
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
    </Container>
  );
}

export default Home;
