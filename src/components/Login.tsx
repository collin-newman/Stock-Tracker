import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log(username, password);
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

export default Login;