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
    if (fetch) {
      const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials',
        params: {symbol: fetch, region: 'US'},
        headers: {
          'x-rapidapi-key': 'c4182ea640msh91c3897924ad99ap13e4f9jsn42bf788eaff9',
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
      };

      axios.request(options)
        .then(function (response) {
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
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