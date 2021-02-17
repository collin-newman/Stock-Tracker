import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const TickerSearch = ({ getData }: any) => {
  const [ticker, setTicker] = useState('');
  const [fetch, setFetch] = useState('');

  const submit  = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    setFetch(ticker);
  };

  useEffect(() => {
    // wrap api call in if block to prevent using up a request on initial load
    if (fetch) {
      axios.post(`http://localhost:3000/api/stock`, { ticker: fetch })
        .then(response => getData())
        .catch(err => console.log(err));
    }
  }, [fetch]);

  return (
    <section>
      <form onSubmit={submit}>
        <input type='text' onChange={(e) => setTicker(e.target.value)} defaultValue=''></input>
        <Button type="submit">submit</Button>
      </form>
    </section>
  );
}

export default TickerSearch;