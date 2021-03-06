import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const url = process.env.HOST || 'http://localhost:3000';
console.log(url);
const TickerSearch = ({ getData }: any) => {
  const [ticker, setTicker] = useState('');
  const [fetch, setFetch] = useState('');
  const submit  = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    setFetch(ticker);
  };

  useEffect(() => {
    console.log('Use Effect');
    // wrap api call in if block to prevent using up a request on initial load
    if (fetch) {
      axios.post(`${url}/api/stock`, { ticker: fetch })
        .then(response => {
          console.log(response);
          getData();
        })
        .catch(err => console.log(err));
    }
  }, [fetch]);

  return (
    <section className='mainItem'>
      <form onSubmit={submit} className='form'>
        <InputGroup className="mb-3" size='lg'>
          <FormControl
            placeholder="Add a stock"
            aria-label="Add a stock"
            aria-describedby="basic-addon2"
            onChange={(e: any) => setTicker(e.target.value)}
            defaultValue=''
          />
          <InputGroup.Append>
            <Button type='submit' variant="outline-secondary">add</Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </section>
  );
}

export default TickerSearch;
