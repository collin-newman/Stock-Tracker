import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const TickerSearch = () => {
  const [ticker, setTicker] = useState({name: ''});
  const [fetch, setFetch] = useState(null);
  const form = useRef(null);

  const submit  = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const data = new FormData(form.current).get('ticker[name]');
    setFetch(data);
    console.log(data);
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
      <form ref={form} onSubmit={submit}>
        <input type='text' name="ticker[name]" onChange={(e) => setTicker({name: e.target.value})} defaultValue={ticker.name}></input>
        <input type='submit' name="=>"/>
      </form>
    </section>
  );
}

export default TickerSearch;