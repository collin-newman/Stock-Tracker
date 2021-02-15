import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const TickerSearch = () => {
  const [ticker, setTicker] = useState('');
  const [fetch, setFetch] = useState('');

  const submit  = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    setFetch(ticker);
  };

  useEffect(() => {
    // wrap api call in if block to prevent using up a request on initial load
    if (fetch) {
      axios.post(`${process.env.HOST || 'http://localhost'}:${process.env.PORT || 3000}/api/stock`, { ticker: fetch })
      .then(response => console.log(response))
      .catch(err => console.log(err));
    }
  }, [fetch]);

  return (
    <section>
      <form onSubmit={submit}>
        <input type='text' onChange={(e) => setTicker(e.target.value)} defaultValue=''></input>
        <input type='submit' name="=>"/>
      </form>
    </section>
  );
}

export default TickerSearch;