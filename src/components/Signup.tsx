import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log(username, password);
    axios.post('http://localhost:3000/api/signup', { username, password, })
      .then(response => console.log(response))
      .catch(err => console.log(err));
    setUsername('');
    setPassword('');
  }

  return (
    <section>
      <form onSubmit={submit}>
        <input
          type='text'
          onChange={e => setUsername(e.target.value)}
          value={username}
          placeholder='username'
        />
        <input
          type='password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder='password'
        />
        <button type='submit'>Login</button>
      </form>
    </section>
  );
};

export default Signup;